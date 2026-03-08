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
    <div className="text-center text-sm pt-2">
      <span className="text-slate-500 mr-1">{comment}</span>
      <button
        type="button"
        onClick={() => navigate(to, { state: location.state })}
        className="font-semibold text-primary-dark hover:text-[#3d6e2c] transition-colors ml-1"
      >
        {text}
      </button>
    </div>
  );
}
