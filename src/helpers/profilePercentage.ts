import {
  BaseUserData,
  MeetingPreference,
  PateData,
  UserData,
} from "../util/types";

const profilePercentage = (profile: PateData | UserData): number => {
  const baseData = [
    "firstName",
    "lastName",
    "gender",
    "ageRange",
    "languages",
    "occupation",
  ];
  const basePateData = ["experience", "motivation"];
  const meetingPreference = [
    "diseaseConsultation",
    "location",
    "meeting",
    "support",
  ];

  let fieldComplete = 0;

  if (profile?.baseUserData.role === "pate") {
    baseData.splice(baseData.length, 0, ...basePateData);
  }

  for (const field of baseData) {
    if (profile?.baseUserData[field as keyof BaseUserData]) {
      fieldComplete++;
    }
  }

  for (const field of meetingPreference) {
    if (profile?.meetingPreference[field as keyof MeetingPreference]) {
      fieldComplete++;
    }
  }

  let result = Math.round((fieldComplete / (baseData.length + meetingPreference.length))*100);

  return result;
};

export default profilePercentage;
