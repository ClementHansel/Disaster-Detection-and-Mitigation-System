type DecisionType = "Anomaly" | "Good" | "Bad" | "Other";

interface DecisionPayload {
  filterCriteria: {
    site: string;
    sensor: string;
    dateFrom: string;
    dateTo: string;
    timeFrom: string;
    timeTo: string;
  };
  decision: DecisionType;
  timestamp: string;
}

const userDecisions: DecisionPayload[] = [];

export const saveDecision = async (
  payload: DecisionPayload
): Promise<{ success: boolean; message: string }> => {
  userDecisions.push(payload);
  return { success: true, message: "Decision saved successfully." };
};

export const getDecisions = async (): Promise<DecisionPayload[]> => {
  return userDecisions;
};
