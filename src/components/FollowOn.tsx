import { FaGithub, FaXTwitter } from 'react-icons/fa6';

export const FollowOn = () => {
  return (
    <>
      <div className="font-bold text-sm text-gray-400 p-2">
        <span>Follow on:</span>
        <div className="flex gap-4 pt-3">
          <a href="https://x.com/rajmachawaal">
            <FaXTwitter />
          </a>
          <a href="https://github.com/atulkumar-20">
            <FaGithub />
          </a>
        </div>
      </div>
    </>
  );
};
