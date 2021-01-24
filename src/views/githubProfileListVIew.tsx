import { ProfileCard } from "../components/card";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddUser } from "../store/epics/epic/userEpics";
import { GithubProfileState } from "../store/reducers/reducer/githubProfileReducer";

export const GithubProfileView = () => {
  const [username, setUsername] = useState<string>("");
  const { items } = useSelector((state: GithubProfileState) => state);
  const dispatch = useDispatch();

  return (
    <>
      <input
        className="fancy-searchbar"
        type="text"
        onChange={(e: any) => setUsername(e.target.value)}
      />
      <button
        className="fancy-button"
        onClick={() => dispatch(AddUser(username))}
      >
        Search{" "}
      </button>
      <div className="fancy-itemlist">
        {items && items?.length > 0
          ? items.map((profile) => (
              <ProfileCard key={profile.html_url} {...profile} />
            ))
          : null}
      </div>
    </>
  );
};
