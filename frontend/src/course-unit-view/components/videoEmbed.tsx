interface VideoEmbedProps extends React.HTMLAttributes<HTMLIFrameElement> {
    src: string;
    size: size;
}

type size = "small" | "medium" | "large";

type dimension = {
    width: number,
    height: number
}

const sizeToDemension: Map<size, dimension> = new Map([
    ["small", {width: 560, height:315}],
    ["medium", {width: 660, height:380}],
    ["large", {width: 853, height:480}]
]);


export function VideoEmbed({ src, size = "medium" }: VideoEmbedProps) {
    const dimensions = sizeToDemension.get(size);

    if (!dimensions) {
      throw new Error(`Unsupported size: ${size}`);
    }
  
    const { width, height } = dimensions;

    return (
        <iframe 
            src={src}
            width={width}
            height={height}
            style={{ border: "none", overflow: "hidden"}}
            allowFullScreen
        />
    )
}