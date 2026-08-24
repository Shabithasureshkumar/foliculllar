import React from 'react';
import avatarImg from '../../assets/avatar.png';

export const UserProfileCard: React.FC = () => {
  return (
    <div className="bg-gradient-user-profile rounded-[clamp(1.5rem,2.5vw,2.11rem)] p-5 text-white relative overflow-hidden shadow-card flex items-center justify-between min-h-[148px] w-full">
      {/* User Information */}
      <div className="flex flex-col justify-center z-10 space-y-1 max-w-[155px]">
        <h2 className="text-[clamp(1.15rem,1.6vw,1.35rem)] font-extrabold leading-tight tracking-tight">
          Jimmy Alexa
        </h2>
        <p className="text-[clamp(0.9rem,1.2vw,1.05rem)] font-semibold opacity-95">
          Gender:Female
        </p>
        <p className="text-[clamp(0.9rem,1.2vw,1.05rem)] font-normal opacity-90">
          Age:38
        </p>
      </div>

      {/* Avatar Image */}
      <div className="absolute right-0 bottom-0 top-0 w-[125px] flex items-end justify-end pointer-events-none">
        <img
          src={avatarImg}
          alt="Jimmy Alexa avatar portrait"
          className="h-full max-h-[148px] w-auto object-cover object-top select-none"
          loading="eager"
        />
      </div>
    </div>
  );
};
