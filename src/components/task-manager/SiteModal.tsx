import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DeleteConfirmModal from "./DeleteConfirmModal"; // Import confirmation modal

interface SiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (site: { name: string; location: string }) => void;
  onDelete?: (siteName: string) => void;
  initialData?: { name: string; location: string };
}

const SiteModal: React.FC<SiteModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData,
}) => {
  const [siteData, setSiteData] = useState(
    initialData || { name: "", location: "" }
  );
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleDelete = () => {
    if (onDelete && initialData) {
      onDelete(initialData.name);
      setDeleteConfirmOpen(false);
      onClose();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{initialData ? "Edit Site" : "Add Site"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              name="name"
              placeholder="Site Name"
              value={siteData.name}
              onChange={(e) =>
                setSiteData({ ...siteData, name: e.target.value })
              }
            />
            <Input
              name="location"
              placeholder="Location"
              value={siteData.location}
              onChange={(e) =>
                setSiteData({ ...siteData, location: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {initialData && onDelete && (
              <Button
                variant="destructive"
                onClick={() => setDeleteConfirmOpen(true)}
              >
                Delete Site
              </Button>
            )}
            <Button onClick={() => onSave(siteData)}>
              {initialData ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        itemName={siteData.name} // ✅ Now correctly passing itemName
      />
    </>
  );
};

export default SiteModal;
