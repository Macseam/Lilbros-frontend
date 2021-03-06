import React from 'react';
import _ from 'lodash';

import settings from '../../settings';
import SingleItem from './SingleItem';
import { MdAddCircle } from 'react-icons/lib/md';

const ItemsList = props => {

  return (
    <div className="chapter-items-list-wrapper">
      <h3 className="items-list-title">{props.chapterTitle}</h3>
        {_.map(props.chapterItems, (chapterItem, key)=>{
          let foundThumb = null;
          _.map(chapterItem.images, (imgObj)=>{
            if (imgObj && imgObj.url && (imgObj.kind === 'thumb')) {
              foundThumb = imgObj.url;
            }
          });
          return (
          <SingleItem
            key={key}
            title={chapterItem.title}
            color={chapterItem.color}
            cover={(chapterItem.images && !_.isEmpty(chapterItem.images))
              ? settings.apiUrl + '/uploads/' + (foundThumb || chapterItem.images[0].url)
              : ''}
            description={props.limitDescription(chapterItem.description)}
            editAction={props.editAction ? ()=>{props.editAction('/list/' + props.chapterSlug + '/' + chapterItem.slug)} : null}
            toggleDeleteConfirmation={(e)=>props.toggleDeleteConfirmation(e)}
            limitDescription={(val)=>props.limitDescription(val)}
            deleteAction={props.deleteAction ? (e)=>{props.deleteAction(e, chapterItem._id)} : null}
            goToItem={()=>{props.goToItem('/list/' + props.chapterSlug + '/' + chapterItem.slug)}}
          />
          );
        })}
      {!!props.addNewItem &&
      <div className="bs-callout bs-callout-info list-item add-item">
        <div className="image-placeholder" onClick={()=>{props.addNewItem()}}>
          <MdAddCircle />
        </div>
        <h4 className="link list-item-title" onClick={()=>{props.addNewItem()}}>Добавить новый элемент</h4>
      </div>
      }
    </div>
  );
};

export default ItemsList;
