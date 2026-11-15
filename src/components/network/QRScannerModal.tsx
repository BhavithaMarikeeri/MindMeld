"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, QrCode, ArrowRight, AlertCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { useDemoStore } from "@/lib/demo/DemoContext";

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QRScannerModal({ isOpen, onClose }: QRScannerModalProps) {
  const router = useRouter();
  const { allStudents } = useDemoStore();
  const { toast } = useToast();

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [manualCode, setManualCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize camera when opened
  useEffect(() => {
    if (!isOpen) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      return;
    }

    // Try camera access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setHasCameraPermission(true);
          setIsScanning(true);
        })
        .catch(() => {
          setHasCameraPermission(false);
        });
    } else {
      setHasCameraPermission(false);
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [isOpen]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;

    // Check if entered code matches a student ID or URL
    const cleaned = manualCode.trim().toLowerCase();
    const matched = allStudents.find(
      (s) =>
        s.id.toLowerCase() === cleaned ||
        s.fullName.toLowerCase().includes(cleaned) ||
        cleaned.includes(s.id.toLowerCase())
    );

    if (matched) {
      toast({
        title: "Student Identified!",
        description: `Redirecting to ${matched.fullName}'s profile...`,
        type: "success"
      });
      onClose();
      router.push(`/profile/${matched.id}`);
    } else {
      toast({
        title: "Profile Not Found",
        description: "Please check the student ID or paste a valid MINDMELD profile URL.",
        type: "error"
      });
    }
  };

  // Simulate scanning a test peer
  const handleSimulateScan = () => {
    const randomPeer = allStudents[1] || allStudents[0];
    toast({
      title: "QR Code Scanned Successfully!",
      description: `Matched with ${randomPeer.fullName}. Opening profile...`,
      type: "success"
    });
    onClose();
    router.push(`/profile/${randomPeer.id}`);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Scan Campus QR Badge"
      description="Point your device camera at a student's MINDMELD QR code to connect instantly."
    >
      <div className="space-y-5 pt-2">
        {/* Camera Viewport / Fallback */}
        <div className="relative aspect-square max-w-xs mx-auto rounded-3xl overflow-hidden bg-slate-950 border-2 border-violet-500/40 shadow-glow-violet flex items-center justify-center">
          {hasCameraPermission ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {/* Animated HUD Reticle */}
              <div className="absolute inset-8 border-2 border-dashed border-cyan-400/80 rounded-2xl pointer-events-none animate-pulse flex items-center justify-center">
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#06b6d4] animate-float" />
              </div>
            </>
          ) : (
            <div className="p-6 text-center space-y-3">
              <Camera className="h-10 w-10 text-slate-500 mx-auto" />
              <div className="text-xs text-slate-400">
                Camera access inactive or unavailable on this device.
              </div>
              <Button
                size="sm"
                variant="cyber"
                className="text-xs"
                onClick={handleSimulateScan}
              >
                Simulate QR Scan Sample
              </Button>
            </div>
          )}
        </div>

        {/* Manual Fallback */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <label className="text-xs font-semibold text-slate-300">
            Manual Profile Link / Student ID Fallback:
          </label>
          <form onSubmit={handleManualSubmit} className="flex items-center gap-2">
            <Input
              placeholder="e.g. student-2 or paste profile URL"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
            />
            <Button type="submit" variant="primary" size="sm">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </Dialog>
  );
}

