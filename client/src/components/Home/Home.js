import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'
import Posts from '../Posts/Posts'
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts, getPostBySearch } from '../../actions/posts'
import useStyles from './styles'
import Paginate from '../Pagination';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [currentId, setCurrentId] = useState(null)
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    const handleKeyPress = (e) => {
        if(e.key === "Enter") {
            searchPost()
        }
    }
    const handleTagAddition = (value) => { setTags([...tags, value]) }
    const handleTagDeletion = (value) => { setTags(tags.filter((tag) => tag !== value)) }

    const searchPost = (e) => {
        e.preventDefault()
        if(search.trim() || tags.length > 0){
            dispatch(getPostBySearch({search, tags: tags.join(',')}))
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/')
        }
    }

  return (
    <Grow in>
        <Container maxWidth="xl">
            <Grid className={classes.gridContainer} container justify="space-between" alignItems='stretch' spacing={3}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                        <TextField
                            name='search'
                            variant='outlined'
                            label='Search Memories'
                            onKeyPress={handleKeyPress}
                            fullWidth
                            value={search}                            
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <ChipInput
                            style={{ margin: '10px 0' }}
                            value={tags}
                            onAdd={handleTagAddition}
                            onDelete={handleTagDeletion}
                            label='Search Tags'
                            variant='outlined'
                        />
                        <Button
                            onClick={searchPost}
                            className={classes.searchButton}
                            variant='contained'
                            color="primary"
                        >
                            Search
                        </Button>
                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    <Paper className={classes.pagination} elevation={6}>
                        <Paginate page={page} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home