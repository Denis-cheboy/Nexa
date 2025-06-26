import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface ResetModalProp {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmResetModal: React.FC<ResetModalProp> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to reset the chats?</DialogTitle>
          <DialogDescription>
            This will clear the current conversation.Plus all the saved ideas.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Reset Ideas</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmResetModal;
