export interface BaseUserData {
  role: string;
  account: string;
  firstName: string;
  lastName: string;
  gender: string;
  ageRange: string;
  languages: string[];
  occupation: string;
  supportGroup: string;
  isAccountVerified: boolean;
  isBaseDataVerified: boolean;
  isMeetingPreferenceVerified: boolean;
  baseUserData: string;
  meetingPreference: MeetingPreference;
  pendingContact: string[];
  verifiedContact: string[];
}

export interface PateBaseUserData extends BaseUserData{
  processBEM: boolean;
  experience: string;
  motivation: string;
}

export interface PateData extends UserData {
  baseUserData: PateBaseUserData;
}

export interface MeetingPreference {
  support: string[];
  diseaseConsultation: string[];
  meeting: string[];
  location: string;
  time: Date;
}

export interface Match {
  account: string;
  ageRange: string[];
  firstName: string;
  lastName: string;
  occupation: string;
  languages: string[];
  experience: string;
  motivation: string;
  gender: string;
  meetingPreference: MeetingPreference;
  score: number;
  date: Date;
}

export interface UserData {
  _id: string;
  account: string;
  isAccountVerified: boolean;
  isBaseDataVerified: boolean;
  isMeetingPreferencesVerified: boolean;
  baseUserData: BaseUserData;
  meetingPreference: MeetingPreference;
  createdAt: Date;
  updatedAt: Date;
}