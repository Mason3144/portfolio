export const s3 = `
/*파일 형식의 데이터를 받기위해 multer를사용하고 
그 파일을 AWS-S3로 넘기기위해 multer-s3를 사용 */
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

/* 먼저 AWS-S3를 만들어준뒤 아래의 키값들을 설정하여 연결해줌 */
const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const bucket = "booking-manager/imgs"

/*위의 설정값과 bucket이름, 각 파일별 key값을 multerS3를 이용하여 
S3서버의 저장위치를 설정한다.*/
const s3ImageUploader = multerS3({
  s3: s3,
  bucket,
  acl: "public-read", //acl 보안설정으로 외부에서 접근이 가능하게 public-read를 줌
  key: function (req, file, cb) {
      cb(null, `+"`${Date.now()}_${file.originalname}`"+`);
    }, // key값으로는 각 파일들에게 유니크 이름을 주기위해 Date.now() 사용
});

/* multer를 이용하여 위의설정들을 적어준뒤 미들웨어로 필요한 라우터에 사용함,
해당 라우터에 파일이 들어오면 S3서버에 저장이 된다. */
export const uploadFiles = multer({
  storage: s3ImageUploader
})


/* s3.deleteObject를 사용하면 S3서버에서 원하는 파일을 지워줄수도 있다. */
export const handleDeletePhotoFromAWS = async(url: string) => {
  const decodedUrl = decodeURI(url);
  const Key = decodedUrl.split("amazonaws.com/")[1];
  /* url을 가저올경우 위와 같이 디코딩을 이용해서 key값으로 변환이 가능하며
  key값을 바로 가저올경우 디코딩을 해줄 필요는 없음*/

  /*비동기와 promise()를 꼭 해주어야됨*/
   await s3.deleteObject({
      Bucket:"booking-manager",
      Key
    }).promise()
};



`
