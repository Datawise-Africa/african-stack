"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { UserPlus, CheckCircle, AlertCircle } from "lucide-react";

interface RoleRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: string;
}

export function RoleRequestModal({ isOpen, onClose, currentRole }: RoleRequestModalProps) {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!reason.trim()) return;
    
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Role request submitted:", { reason });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit role request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setReason("");
    setIsSubmitted(false);
    onClose();
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <DialogTitle>Request Submitted</DialogTitle>
            </div>
            <DialogDescription>
              Your request to become a creator has been submitted successfully. 
              Our team will review your application and get back to you within 24-48 hours.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <UserPlus className="w-6 h-6 text-primary" />
            <DialogTitle>Request Creator Access</DialogTitle>
          </div>
          <DialogDescription>
            As a creator, you&apos;ll be able to write and publish articles on African Stack. 
            Please tell us why you&apos;d like to become a creator.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge variant="outline">Current Role: {currentRole}</Badge>
            <Badge variant="secondary">Requesting: Creator</Badge>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Why do you want to become a creator?</Label>
            <Textarea
              id="reason"
              placeholder="Tell us about your background, expertise, and what kind of content you plan to create..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[120px]"
            />
            <p className="text-sm text-muted-foreground">
              {reason.length}/500 characters
            </p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">What happens next?</p>
                <ul className="mt-1 space-y-1 text-muted-foreground">
                  <li>• Our team will review your application</li>
                  <li>• You&apos;ll receive an email notification of the decision</li>
                  <li>• If approved, you&apos;ll gain access to the creator dashboard</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!reason.trim() || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
