import { useLocation, useNavigate } from 'react-router-dom';

export type AuthAnchorProps = {
  comment: string;
  text: string;
  to: string;
};

export function AuthAnchor({ to, comment, text }: AuthAnchorProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="pt-2 text-center text-sm">
      <span className="mr-1 font-medium text-slate-500">{comment}</span>
      <button
        type="button"
        onClick={() => navigate(to, { state: location.state })}
        className="ml-1 font-bold text-primary-dark transition-colors hover:text-[#3d6e2c]"
      >
        {text}
      </button>
    </div>
  );
}
