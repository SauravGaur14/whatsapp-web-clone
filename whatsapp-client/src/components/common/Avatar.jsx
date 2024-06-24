export default function Avatar({ image, size }) {
  return (
    <div
      className={`overflow-hidden h-${size} w-${size} flex items-center justify-center rounded-full border border-slate-300`}
    >
      <img
        src={image || "/default_avatar.png"}
        alt="profilePic"
        height={30}
        width={30}
      />
    </div>
  );
}
