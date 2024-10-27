import PropTypes from 'prop-types';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const ChangeAvatar = ({ userId }) => {
  return (
    <div className="flex items-center justify-center">
      <label
        htmlFor="avatar-upload"
        className="btn btn-xs btn-base glass text-base-100 max-w-fit hover:text-base-content"
      >
        <PencilSquareIcon className="w-4" /> {userId}
      </label>
      <input id="avatar-upload" name="avatar" type="file" className="hidden" accept=".jpg, .png" />
    </div>
  );
};

ChangeAvatar.propTypes = {
  userId: PropTypes.number,
};

export default ChangeAvatar;
