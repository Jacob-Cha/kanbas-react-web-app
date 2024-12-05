import React from 'react';
import { FaPlus } from 'react-icons/fa';

export default function TitleControlButtons() {
  return (
    <div className="float-end">
      <span className="me-2">40% of Total</span>
      <button className="btn btn-outline-secondary btn-sm">
        <FaPlus />
      </button>
    </div>
  );
}