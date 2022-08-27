import React, { useEffect } from 'react';
import { Paper, Typography, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';

import useStyles from './styles'
import { getPostBySearch, getPostsById } from '../../actions/posts';
import CommentSection from './CommentSection';
import { Skeleton } from '@material-ui/lab';



const PostDetails = () => {
  const { post, posts, isLoading, redirectToHome, isLoadingPost } = useSelector((state) => state.posts)
  const classes = useStyles();
  const { id }  = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  if(redirectToHome) navigate('/')

  useEffect(() => {
    if(window.atob(id)){
      dispatch(getPostsById(window.atob(id)))
    }else{
      navigate('/')
    }
  }, [id])

  useEffect(() => {
    if(post){
      dispatch(getPostBySearch({ search: 'none', tags: post?.tags?.join(',')}))
    }
  }, [post]);

  const recommendedPosts =  !isLoading && !isLoadingPost && posts.filter(({ _id }) => _id !== post._id)

  const openPost = (id) => { navigate(`/posts/${window.btoa(id)}`)  }
  
  
  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      {isLoadingPost ? <Skeleton variant="rounded" width='100%' height='400px' animation="wave"/> : (
      <>
        <div className={classes.card}>
        <div className={classes.imageSection}>
                <img
                  className={classes.media}
                  src= { post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png' }
                  alt= { post.title }
                />
              </div>
            <div className={classes.section}>
              <Typography variant="h3" component="h2">{post.title}</Typography>
              <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags?.map((tag) => `#${tag} `)}</Typography>
              <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
              <Typography variant="h6">Created by: {post.name}</Typography>
              <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
              <Divider style={{ margin: '20px 0' }} />
              <CommentSection post={post}/>
              <Divider style={{ margin: '20px 0' }} />
            </div>
           
        </div>
        { !isLoadingPost && recommendedPosts.length && (
          <div className={classes.section}>
            <Typography variant='h5' gutterBottom>You might also like</Typography>
            <Divider />
            <div  className={classes.recommendedPosts}>
              {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
                  <div
                    style={{ margin: '20px', cursor: 'pointer'}}
                    onClick={() => openPost(_id)}
                    key={_id}
                  >
                    <Typography variant='h6' gutterBottom>{title}</Typography>
                    <Typography variant='subtitle2' gutterBottom>{name}</Typography>
                    <Typography variant='subtitle2' gutterBottom>{message}</Typography>
                    <Typography variant='subtitle1' gutterBottom>Likes: {likes.length}</Typography>
                    <img src={selectedFile} alt={name} width='200px'/>
                  </div>
              ))}
            </div>
          </div>
        )}
      </>
      )}      
    </Paper>
  )
}

export default PostDetails