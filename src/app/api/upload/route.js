import { nextresponse } from "next/server";
import { writefile } from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: "",
  api_key: "",
  api_secret: "",
});

export async function post(request) {
  const data = await request.formdata();
  const image = data.get("image");

  if (!image) {
    return nextresponse.json("no se ha subido ninguna imagen", { status: 400 });
  }

  const bytes = await image.arraybuffer();
  const buffer = buffer.from(bytes);

  //   guardar en un archivo
    const filepath = path.join(process.cwd(), "public", image.name);
    await writefile(filepath, buffer)
    const response = await cloudinary.uploader.upload(filepath);

  // const response = await new promise((resolve, reject) => {
  //   cloudinary.uploader
  //     .upload_stream({}, (err, result) => {
  //       if (err) {
  //         reject(err);
  //       }

  //       resolve(result);
  //     })
  //     .end(buffer);
  // });

//   guardar en base de datos
// procesar imagen
  console.log(response.secure_url)

  return nextresponse.json({
    message: "imagen subida",
    url: response.secure_url,
  });
}
