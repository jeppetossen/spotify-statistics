type Args = {
  amount: number,
  format: string,
  group: number,
  sample: number
};
type Data = Uint8ClampedArray;
type Handler = (data: Data, args: Args) => TOutput;
type Hex = string;
type RGB = [r: number, g: number, b: number];
type Item = string | HTMLImageElement;

type TInput = (Hex | RGB)[];
type TOutput = Hex | RGB | (Hex | RGB)[];

const getSrc = (item: Item): string => {
  return typeof item === 'string' ? item: item.src;
}

const getArgs = ({
  amount = 3,
  format = 'array',
  group = 20,
  sample = 10,
} = {}): Args => ({amount,format, group, sample});

const format = (input: TInput, args: Args): TOutput => {
  const list = input.map((val) => {
    const rgb = Array.isArray(val) ? val : val.split(',').map(Number) as RGB;
    return args.format === "hex" ? rgbToHex(rgb) : rgb
  });

  return args.amount === 1 || list.length === 1 ? list[0] : list;
}

const rgbToHex = (rgb: RGB): Hex => '#' + rgb.map((val) => {
  const hex = val.toString(16);

  return hex.length === 1 ? '0' + hex : hex;
}).join('');

const getImageData = (src: string): Promise<Data> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const img = new Image();

    img.onload = () => {
      canvas.height = img.height;
      canvas.width = img.width;
      context.drawImage(img, 0, 0);

      const data = context.getImageData(0, 0, img.width, img.height).data;

      resolve(data);
    }

    img.onerror = () => reject(Error('Image loading failed.'));
    img.crossOrigin = "Anonymous";
    img.src = src;
  });
};

const getAverage = (data: Data, args: Args): TOutput => {
  const gap = 4 * args.sample;
  const amount = data.length / gap;
  const rgb = {r: 0, g: 0, b: 0};

  for (let i = 0; i < data.length; i += gap) {
    rgb.r += data[i];
    rgb.g += data[i+1];
    rgb.b += data[i+2];
  }

  return format([[
    Math.round(rgb.r / amount),
    Math.round(rgb.g / amount),
    Math.round(rgb.b / amount)
  ]], args)

  //return 'rgb('+f[0]+', '+f[1]+', '+f[2]+')'
};

const process = (handler: Handler, item: Item, args?: Partial<Args>): Promise<TOutput> => {
  return new Promise((resolve, reject) =>
    getImageData(getSrc(item))
      .then((data) => resolve(handler(data, getArgs(args))))
      .catch((error) => reject(error))
  );
};

const average = (item: Item, args?: Partial<Args>) => process(getAverage, item, args);

export { average };
