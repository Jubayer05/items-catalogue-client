/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import './Form.css';
import { createItems, updateItems } from '../../actions/itemsAction';

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    tags: '',
    selectedFiles: '',
  });

  const post = useSelector((state) =>
    currentId ? state.items.find((p) => p._id === currentId) : null
  );

  const user = JSON.parse(localStorage.getItem('profile'));

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '',
      description: '',
      tags: '',
      selectedFiles: '',
    });
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updateItems(currentId, postData));
    } else {
      dispatch(
        createItems({
          ...postData,
          name: user?.result.name,
        })
      );
    }
    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper>
        <Typography variant="h6" align="center">
          Please sign in to create your own items and like other&apos;s items.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className="paper">
      <form
        autoComplete="off"
        noValidate
        className="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? 'Editing' : 'Creating'} an Item
        </Typography>

        <TextField
          className="fileInput"
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          className="fileInput"
          name="description"
          variant="outlined"
          label="description"
          fullWidth
          value={postData.description}
          onChange={(e) =>
            setPostData({ ...postData, description: e.target.value })
          }
        />
        <TextField
          className="fileInput"
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }
        />
        <div className="fileInput">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFiles: base64 })
            }
          />
        </div>
        <Button
          className="buttonSubmit"
          fullWidth
          color="primary"
          type="submit"
          variant="contained"
          size="large"
        >
          Submit
        </Button>
        <Button
          onClick={clear}
          fullWidth
          className="button__secondary"
          variant="contained"
          size="small"
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
