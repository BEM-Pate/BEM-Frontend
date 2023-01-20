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
  score?: number;
  date?: string;
}

export interface PateData extends BaseUserData {
  processBEM: boolean;
  experience: string;
  motivation: string;
  isCertificateVerified: boolean;
}

export interface NormalUserData extends BaseUserData {
  processBEM: string;
}

export interface MeetingPreference {
  support: string[];
  diseaseConsultation: string[];
  meeting: string[];
  location: string;
  time: Date;
}
