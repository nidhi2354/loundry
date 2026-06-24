
const blog = require("../models/blogModels");

const createBlog = async (req,res)=>{

try{
  const {title,description} = req.body;

  console.log(req.body)
 if (!req.file) {
  console.log(req.file)
  return res.status(400).json({
    success: false,
    message: "Image is required",
  });
}


console.log(req.file)
  const newBlog  =  await blog.create({
    title,
    description,
     image: req.file.path,
  })
return res.status(201).json({
  success: true,
  message:"create blog sucessfully",
  blog: newBlog
});

}catch(error){
  console.log(error)
  return res.status(500).json({
    success: false,
    message:error.message

  })

}
}

const getBlogs = async (req,res)=>{
  try{
    const blogs = await blog.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message:"get all blogs",
     blogs:blogs,
    })

  }catch(error){
  return res.status(500).json({
    success: false,
    message:error.message

  })
  }
}

const getSingleBlog = async (req,res)=>{
  try{
    const {id} = req.params;
    const blogData = await blog.findById(id);

    if(!blogData){
      return res.status(404).json({
        success : false,
        message : "blogData not found"
      })
    }

    return res.status(200).json({
      success: true,
     message: "successfully get blog using id",
     blog:blogData
    })

  }catch(error){
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const deleteBlog  = async (req,res)=>{
  try{
    const {id} = req.params;

    const deleteBlogUsingId = await blog.findByIdAndDelete(id);
    if(!deleteBlogUsingId){
      return res.status(404).json({
        success:false,
        message:"blog data not found"
      })
    }
    return res.status(200).json({
      success : true,
      message:"delete blog using ID successfully"
    })
    
  }catch(error){
    return res.status(500).json({
      success : false,
      message: error.message,
    })
  }
}

const updateBlog = async (req,res)=>{
  try{
    const {id} = req.params;
    const updateData = {};

    const {title,description} = req.body;

    if(title) updateData.title = title;

    if(description) updateData.description = description;


     if (req.file) {
      updateData.image = req.file.path;
    }

    
  
    const updateBlogData = await blog.findByIdAndUpdate(id,updateData,{
      returnDocument: "after"
    });

    if(!updateBlogData){
      return res.status(404).json({
        success : false,
        mesaage:"update blog data not found"
      })
    }
    return res.status(200).json({
      success:true,
      message: "successfully update blog data",
      blog:updateBlogData
    })

  }catch(error){
    return res.status(500).json({
      success : false,
      message: error.message
    })
  }
}

module.exports = {
  createBlog,getBlogs,getSingleBlog,deleteBlog,updateBlog
}