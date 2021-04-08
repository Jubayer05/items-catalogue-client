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
import { deleteItems, likeItems } from '../../../actions/itemsAction';

const Item = ({ item, setCurrentId }) => {
  const dispatch = useDispatch();

  return (
    <Card className="card">
      <CardMedia
        className="media"
        image={item.selectedFiles}
        title={item.title}
      />
      <div className="overlay">
        <Typography variant="h6">{item.creator}</Typography>
        <Typography variant="body2">
          {moment(item.createdAt).fromNow()}
        </Typography>
      </div>
      <div className="overlay2">
        <Button
          onClick={() => setCurrentId(item._id)}
          size="small"
          style={{ color: 'white' }}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
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
          onClick={() => dispatch(likeItems(item._id))}
        >
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; Like &nbsp;
          {item.likeCount}
        </Button>

        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deleteItems(item._id))}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Item;
