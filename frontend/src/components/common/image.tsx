type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
};

const Image: React.FC<ImageProps> = ({ src, alt, className, onClick }) => {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className={className}
      onClick={onClick}
    />
  );
};

export default Image;
