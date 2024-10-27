import { FunnelIcon } from '@heroicons/react/24/outline';

const Filter = () => {
  return (
    <div className="flex flex-wrap justify-end max-md:justify-center items-center gap-2 px-4">
      <label className="flex items-center border input-bordered rounded-lg gap-2">
        <FunnelIcon className="w-4 h-4 ml-4" />
        <select
          className="select select-sm max-md:w-1/3 focus:border-none no-focus"
          defaultValue={0}
        >
          <option value={0} disabled>
            Sort by
          </option>
          <option>Best-selling</option>
          <option>Highest rated</option>
          <option>Nearest location</option>
        </select>
      </label>
    </div>
  );
};

export default Filter;
