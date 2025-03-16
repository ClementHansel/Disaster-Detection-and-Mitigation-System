import { useState } from "react";
import AnnotatedCard from "./AnnotatedCard";
import AnnotatedButtons from "./AnnotatedButtons";
import { getFilteredAnnotations } from "@/lib/ai/aiDataUtils";
import { Annotation } from "@/types/ai/annotation";

interface Filters {
  site: string;
  sensor: string;
  dateFrom: string;
  dateTo: string;
  timeFrom: string;
  timeTo: string;
}

interface AnnotatedListProps {
  filters: Filters;
}

export default function AnnotatedList({ filters }: AnnotatedListProps) {
  const annotations: Annotation[] = getFilteredAnnotations(filters);
  const [selectedAnnotations, setSelectedAnnotations] = useState<Set<string>>(
    new Set()
  );

  const toggleSelection = (id: string) => {
    setSelectedAnnotations((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return newSelection;
    });
  };

  const handleDeleteSelected = () => {
    console.log(
      "Deleting selected annotations:",
      Array.from(selectedAnnotations)
    );
    // Implement deletion logic
    setSelectedAnnotations(new Set()); // Clear selection after deletion
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="font-bold mb-2">Saved Annotations</h2>
      {annotations.length > 0 ? (
        <div className="grid gap-4">
          {annotations.map((annotation) => (
            <AnnotatedCard
              key={annotation.id}
              annotation={annotation}
              isSelected={selectedAnnotations.has(annotation.id)}
              onToggleSelect={toggleSelection}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No annotations available.</p>
      )}

      {selectedAnnotations.size > 0 && (
        <AnnotatedButtons
          onMark={() => console.log("Marking selected")}
          onDelete={handleDeleteSelected}
        />
      )}
    </div>
  );
}
