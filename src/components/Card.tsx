interface CardProps {
  title: string;
  value: string;
  description: string;
  status?: "normal" | "warning" | "critical"; // New status prop
  onClick?: () => void; // Optional click handler
}

const Card: React.FC<CardProps> = ({
  title,
  value,
  description,
  status = "normal",
  onClick,
}) => {
  const statusColor = {
    normal: "text-green-600 dark:text-green-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    critical: "text-red-600 dark:text-red-400",
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center cursor-pointer hover:shadow-lg transition duration-300 ${
        onClick ? "hover:bg-gray-100 dark:hover:bg-gray-700" : ""
      }`}
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className={`text-3xl font-bold ${statusColor[status]} mt-2`}>
        {value}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mt-2">{description}</p>
    </div>
  );
};

export default Card;
