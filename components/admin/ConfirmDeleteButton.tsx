"use client";

import { useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ConfirmDeleteButtonProps {
  /** Server action (already bound to the item id) the form submits on confirm. */
  action: () => void | Promise<void>;
  /** Human-readable name of the item, shown in the dialog and the aria-label. */
  itemName: string;
  /** What kind of thing is being deleted, e.g. "tool" or "blog post". */
  itemType: string;
  /** Extra consequence text shown under the item name. */
  warning?: string;
}

/**
 * Wraps a server-action <form> with a confirmation dialog. The trigger only
 * opens the dialog; the form is submitted (via requestSubmit, so the server
 * action binding is untouched) only when the user presses the confirm button.
 * Cancel receives initial focus and Escape closes the dialog without deleting.
 */
export function ConfirmDeleteButton({
  action,
  itemName,
  itemType,
  warning,
}: ConfirmDeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <form ref={formRef} action={action}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-red-700 dark:text-red-400 hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-400"
            aria-label={`Delete ${itemName}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent
          showCloseButton={false}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            cancelRef.current?.focus();
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-xl">
              Delete {itemType}?
            </DialogTitle>
            <DialogDescription>
              <span className="font-semibold text-foreground">{itemName}</span>{" "}
              will be permanently deleted. This cannot be undone.
              {warning ? ` ${warning}` : null}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              ref={cancelRef}
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                setOpen(false);
                formRef.current?.requestSubmit();
              }}
            >
              Delete {itemType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
