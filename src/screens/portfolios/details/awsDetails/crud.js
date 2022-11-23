export const crudCreate = `
/* POST 리퀘스트를 이용한 DB에 제품등록 */

export const postProductApply = async (req:Request, res) => {
    try {
      const {
        body: { name },
        file: { location: pictures },
        /* multer를 이용한 미들웨어로 파일에 접근이 가능하며
        location은 AWS-S3에 저장된 경로를 의미
        ACL보안설정을 public-read로 하여 외부에서도 접근이 가능하게 함*/
        session: {
          user: { id: owner_id },
        }, /* session을 이용하여 쿠키에 저장된 유저의 id를 얻어냄 */
      } = req;
      
      const productExists = await db.findSingleProduct(name,"name");
      /* 위에 생성한 쿼리문을 이용하여 같은 제품이 있는지 확인 */

      if (productExists) {
      return res.send({ ok: false, error: "같은 이름의 제품이 존재합니다. 이름을 바꿔주세요." })
      }

      const newProduct = await db.createProduct(name, pictures, owner_id);
      /* 마찬가지로 쿼리문을 이용, 제품명, 파일위치, 유저의 id를 가지고 제품을 등록함 */

      if (!newProduct) {
        return res.send({ ok: false, error: "데이터베이스에 접근할수 없습니다." })
      }
      return res.send({ok:true, newProduct})
      /* 등록한 제품의 정보를 response 해줌 */

    } catch (error) {
      return res.send({ok:false,error})
    }
  };

`
export const crudRead = `
/* GET 리퀘스트를 이용한 DB의 제품 불러오기 */
export const getProduct = async (req:Request, res) => {
    try {
        const {id:owner_id}=req.session.user
        const allProduct = await db.allProduct(owner_id)
        return res.json({ok:true,allProduct})
        /* 세션과 쿼리문을 이용해 사용자가 등록한 모든 제품을 보내준다 */

    } catch (error) {
        return res.send({ok:false,error})
    }
}
`
export const crudEdit = `
/* POST 리퀘스트를 이용한 DB의 제품 업데이트 */
export const productEdit = async(req:Request,res)=>{
    try {
        const {
            body: { name,id },
            file
          } = req;
          const productExists = await db.findSingleProduct(id,"id");
          if (!productExists) {
          return res.send({ ok: false, error: "제품이 존재하지 않습니다. 제품등록을 먼저해주세요" })
          } /* 먼저 제품이 존재하는지 확인 */

        const editProduct = await db.editProduct(id, name, file?.location? file.location:null);
        /* 쿼리문을 통해 제품 id를 이용하여 해당제품을 찾은후 제품명을 업데이트,
        만약 제품 이미지또한 업데이트한다면 해당 이미지의 경로또한 업데이트해줌 */

            if (!editProduct) {
            return res.send({ ok: false, error: "데이터베이스에 접근할수 없습니다." })
            }
        if (file?.location) {
            handleDeletePhotoFromAWS(file.location)
            /* 새로운 파일 경로가 들어오면 s3.deleteObject를 이용하여
            S3의 예전 파일은 삭제해준다 */
        }
            return res.send({ok:true, editProduct})
    }catch(error){
        return res.send({ok:false, error})
    }
}
`
export const crudDelete = `
/* DELETE 리퀘스트를 이용한 DB의 제품 삭제 */
export const productDelete = async (req:Request, res) => {
    try {
        const existProduct = await db.findSingleProduct(req.body.id, "id")
        if (!existProduct) {
            return res.send({ok:false, error:"제품이 존재하지 않습니다."})
        }/* 제품이 존재하지 않더라도 쿼리문은 에러없이 작동되지만 
        사용자에게 response를 보내 정보 제공*/

        await db.deleteProduct(req.body.id)
        handleDeletePhotoFromAWS(existProduct.pictures)
        /* 쿼리문을 통해 해당 RDS에서 해당제품을 삭제한후
        마찬가지로 S3에서도 삭제해준다 */

        return res.send({ok:true, message:"제품이 삭제되었습니다."})
    } catch (error) {
        return res.send({ ok: false, error })
    }
}
`