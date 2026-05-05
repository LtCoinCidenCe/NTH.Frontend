import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../provider/UserContext";

const CROP_SIZE = 250;

const IconEditing: React.FC = () => {
  const { currentUser } = useContext(UserContext);
  const [originalBitmap, setOriginalBitmap] = useState<ImageBitmap>();
  const [useSize, setUseSize] = useState(CROP_SIZE);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [isDragging, setIsDragging] = useState(false);
  const [isIconOpen, setIsIconOpen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const iconBackgroundImageStyle = currentUser.userIconID === "00000000-0000-0000-0000-000000000000"
    ? undefined
    : `${import.meta.env.VITE_BACKEND_URL}/api/User/Icon/${currentUser.userIconID}`;

  useEffect(() => {
    if (!originalBitmap || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    // TODO
    // console.log("useSize", useSize);
    ctx.drawImage(originalBitmap, position.x, position.y, useSize, useSize, 0, 0, CROP_SIZE, CROP_SIZE);
  }, [originalBitmap, useSize, position]);

  return <div className="my-5 mx-auto flex flex-col items-center w-sm lg:w-2xl space-y-3">
    <input className="w-24 h-24 rounded-full self-start text-black/0 bg-gray-300 bg-contain hover:border-red-500 hover:border-dashed hover:border-2"
      type="file"
      style={{
        backgroundImage: iconBackgroundImageStyle ? `url(${iconBackgroundImageStyle})` : undefined
      }}
      accept="image/*"
      onChange={async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        let dotbitmap;
        try { dotbitmap = await createImageBitmap(file); }
        catch (error) {
          alert("无法加载图片，请确保文件是有效的图片格式");
          return;
        }
        if (dotbitmap.width < 200 || dotbitmap.height < 200) {
          alert("请上传至少200x200像素的图片");
          return;
        }
        setOriginalBitmap(dotbitmap);
        setPosition({ x: 0, y: 0 });
        setUseSize(Math.min(dotbitmap.width, dotbitmap.height));
        setIsDragging(false);
      }}
    />

    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
      onClick={() => setIsIconOpen(true)}>修改头像</button>

    {originalBitmap && // 黑幕
      <div className="fixed inset-0 z-35 bg-black/36 flex justify-center items-center"
        onClick={() => setOriginalBitmap(undefined)}>
        <div className="bg-white rounded-3xl"
          onClick={ // 白幕防退出区
            e => e.stopPropagation()
          }>
          <div className="m-15 lg:m-25">
            <canvas
              ref={canvasRef}
              width={CROP_SIZE}
              height={CROP_SIZE}
              className="w-50 lg:w-75 cursor-grab active:cursor-grabbing border border-gray-300"
              onMouseDown={e => {
                setIsDragging(true);
              }}
              onMouseMove={e => {
                if (!isDragging) return;
                console.log("moving", e.movementX, e.movementY, useSize);
                const scale = Math.floor(1 + useSize / CROP_SIZE);
                const newX = Math.min(Math.max(0, position.x - e.movementX * scale), originalBitmap.width - useSize);
                const newY = Math.min(Math.max(0, position.y - e.movementY * scale), originalBitmap.height - useSize);
                setPosition({ x: newX, y: newY });
              }}
              onMouseUp={e => {
                setIsDragging(false);
              }}
              onMouseLeave={e => {
                setIsDragging(false);
              }}
              onWheel={e => {
                e.preventDefault();
                const delta = Math.floor(e.deltaY > 0 ? -useSize / 16 : useSize / 16);
                const mapShort = Math.min(originalBitmap.width, originalBitmap.height);
                const targetUseSize = Math.min(Math.max(30, useSize + delta), mapShort);
                const newPos = position;
                if (position.x + targetUseSize > originalBitmap.width)
                  newPos.x = Math.max(0, originalBitmap.width - targetUseSize);
                if (position.y + targetUseSize > originalBitmap.height)
                  newPos.y = Math.max(0, originalBitmap.height - targetUseSize);
                setPosition(newPos);
                setUseSize(targetUseSize);
              }}
            />
          </div>
        </div>
      </div>}
  </div>;
};

export default IconEditing;
