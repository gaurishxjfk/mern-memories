import React from 'react';
import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';


const Posts = ({ setCurrentId }) => {
    const classes = useStyles();
    const { posts, isLoading } = useSelector((state) => state.posts)

    if(!posts.length && !isLoading) return 'No Posts!!'
    
    return(
            <Grid
                className={classes.container}
                container
                alignItems='stretch'
                spacing={3}
            >
                {
                    (isLoading ? Array.from(new Array(4)) : posts).map((post, index) => (
                        post ? (
                                <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}>
                                    <Post post={post} setCurrentId={setCurrentId}/>
                                </Grid>
                            ) : (
                                <Grid key={index} item xs={12} sm={6} md={6} lg={3}>
                                    <Skeleton variant="rounded" width={210} height={318} />
                                </Grid>
                            )
                        ))
                    
                }
            </Grid>
    )
}

export default Posts;