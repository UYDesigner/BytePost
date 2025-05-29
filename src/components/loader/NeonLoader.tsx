
import "./NeonLoader.css";

const NeonLoader = () => {
  return (
    <div className="w-30 sm:w-55  ">
      <div className="neon-loader-grid w-[50px] h-[50px] sm:w-[90px] sm:h-[90px]  ">
        <div className="neon-block pos-1" />
        <div className="neon-block pos-2" />
        <div className="neon-block pos-3" />

      </div>
    </div>
  );
};

export default NeonLoader;
