import "./card.css";

export type Profile = {
  login: string;
  avatar_url: string;
  html_url: string;
};

export const ProfileCard = (source: Profile) => {
  const { avatar_url, html_url, login } = source;
  return (
    <div className="profilecard-wrapper">
      <img className="profilecard-image" src={avatar_url} alt="profilePic" />
      <div className="profilecard-content-wrapper">
        <div className="profilecard-name">{login}</div>
        <a className="profilecard-link" href={html_url} target="_blank">
          {html_url}
        </a>
      </div>
    </div>
  );
};
