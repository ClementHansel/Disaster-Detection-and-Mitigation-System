import React from "react";
import { Site } from "@/types/task-manager/site";
import { Button } from "@/components/ui/button";

interface SiteListProps {
  sites: Site[];
  onDeleteSite: (siteId: string) => void;
}

const SiteList: React.FC<SiteListProps> = ({ sites, onDeleteSite }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Sites</h2>
      <ul>
        {sites.map((site) => (
          <li
            key={site.id}
            className="flex justify-between items-center p-2 border-b"
          >
            <span>{site.name}</span>
            <Button variant="destructive" onClick={() => onDeleteSite(site.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SiteList;
