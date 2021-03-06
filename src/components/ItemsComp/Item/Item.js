/* eslint-disable no-underscore-dangle */
import React from 'react';
import './Item.css';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { ThumbUpAltOutlined } from '@material-ui/icons';
import { deleteItems, likeItems } from '../../../actions/itemsAction';

const Item = ({ item, setCurrentId }) => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile')) || { result: null };

  const Likes = () => {
    if (item.likes.length > 0) {
      return item.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {item.likes.length > 2
            ? `You and ${item.likes.length - 1} others`
            : `${item.likes.length} like${item.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{item.likes.length} {item.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className="card">
      <CardMedia
        className="media"
        image={item.selectedFiles}
        title={item.title}
      />
      <div className="overlay">
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="body2">
          {moment(item.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.result?.googleId === item?.creator ||
        user?.result?._id === item?.creator) && (
        <div className="overlay2">
          <Button
            onClick={() => setCurrentId(item._id)}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}
      <div className="details">
        <Typography variant="body2" color="textSecondary">
          {item.tags.map((tag) => ` #${tag}`)}
        </Typography>
      </div>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {item.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions className="cardActions">
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(likeItems(item._id))}
        >
          <Likes />
          &nbsp; &nbsp;
          {item.likeCount}
        </Button>

        {(user?.result?.googleId === item?.creator ||
          user.result?._id === item?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deleteItems(item._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Item;
