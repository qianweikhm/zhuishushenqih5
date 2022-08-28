import React, { useState, useEffect } from 'react';
import { getLink } from '../../utils/api'



function BookDetail({ location }) {
  const { state } = location

  const getLinkDetail = async () => {
    const data = await getLink(state.link)
  }
  useEffect(() => {
    getLinkDetail()
  })
  return (
    <>
      BookDetail
    </>
  );
}

export default BookDetail;