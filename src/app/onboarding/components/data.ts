import {
  AtSign,
  Briefcase,
  Building2,
  CircleEllipsis,
  Code2,
  Globe,
  Laptop,
  LucideIcon,
  Mail,
  MessagesSquare,
  Network,
  PenTool,
  Rocket,
  Search,
  Users,
  //   Instagram,
  //   LinkedIn,
} from "lucide-react";

export interface Option {
  label: string;
  value: string;
  Icon: LucideIcon;
}

export const WORK_OPTIONS: Option[] = [
  { label: "Developer", value: "DEVELOPER", Icon: Code2 },
  { label: "Designer", value: "DESIGNER", Icon: PenTool },
  { label: "Consultant", value: "CONSULTANT", Icon: Briefcase },
  { label: "Agency", value: "AGENCY", Icon: Building2 },
  { label: "Freelancer", value: "FREELANCER", Icon: Laptop },
  { label: "Other", value: "OTHER", Icon: CircleEllipsis },
];

export const CHANNEL_OPTIONS: Option[] = [
  { label: "Instagram", value: "INSTAGRAM", Icon: AtSign },
  { label: "LinkedIn", value: "LINKEDIN", Icon: AtSign },
  { label: "X", value: "X", Icon: AtSign },
  { label: "Cold email", value: "COLD_EMAIL", Icon: Mail },
  { label: "Referrals", value: "REFERRALS", Icon: Users },
  {
    label: "Freelance platforms",
    value: "FREELANCE_PLATFORMS",
    Icon: Globe,
  },
  { label: "Networking", value: "NETWORKING", Icon: Network },
  { label: "Other", value: "OTHER", Icon: CircleEllipsis },
];

export const SOURCE_OPTIONS: Option[] = [
  { label: "X", value: "X", Icon: AtSign },
  { label: "Instagram", value: "INSTAGRAM", Icon: AtSign },
  { label: "LinkedIn", value: "LINKEDIN", Icon: AtSign },
  { label: "Google", value: "GOOGLE", Icon: Search },
  { label: "Friend", value: "FRIEND", Icon: Users },
  { label: "Product Hunt", value: "PRODUCT_HUNT", Icon: Rocket },
  {
    label: "Recommendation",
    value: "RECOMMENDATION",
    Icon: MessagesSquare,
  },
  { label: "Other", value: "OTHER", Icon: CircleEllipsis },
];

export const TOTAL_STEPS = 3;
