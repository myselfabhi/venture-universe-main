import Image from "next/image";

interface NewsCardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

export default function NewsCard({ title, description, imageUrl }: NewsCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          width={600}
          height={200}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}
      <h2 className="text-xl font-semibold mt-2">{title}</h2>
      <p className="text-gray-600 mt-1">{description}</p>
    </div>
  );
}