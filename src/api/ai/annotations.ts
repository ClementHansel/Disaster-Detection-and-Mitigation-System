const annotations: { sensorId: string; annotation: string }[] = [];

export const getAnnotations = async (sensorId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        annotations.filter((annotation) => annotation.sensorId === sensorId)
      );
    }, 500); // Simulate API delay
  });
};

export const addAnnotation = async (sensorId: string, annotation: string) => {
  annotations.push({ sensorId, annotation });
  return { success: true, message: "Annotation added successfully." };
};
