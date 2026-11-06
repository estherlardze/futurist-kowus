import { TrendingUp, Users, Lightbulb, Target, Globe, Award, type LucideIcon } from "lucide-react";

export interface ExpertiseItem { icon: LucideIcon; title: string; description: string }
export interface Achievement { title: string; organization: string; year: string; description: string }
export interface TimelineItem { year: string; title: string; description: string }

export const expertise: ExpertiseItem[] = [
  {
    icon: Users,
    title: "Industrial Relations",
    description: "Expert practitioner in trade union leadership and workers' education, with over two decades protecting the rights of maritime employees and organized labor."
  },
  {
    icon: Globe,
    title: "Environmental Advocacy",
    description: "Executive Director of Wacam, leading the fight against irresponsible mining and championing environmental justice with local and international recognition."
  },
  {
    icon: Target,
    title: "Alternative Dispute Resolution",
    description: "Professional ADR Practitioner and President of GNAAP, conducting court-connected mediation and promoting peaceful conflict resolution across Ghana."
  },
  {
    icon: Award,
    title: "Human Rights Activism",
    description: "Dedicated advocate for vulnerable communities, indigenous rights, and social justice, honored by the American Indian Movement for exemplary leadership."
  },
  {
    icon: TrendingUp,
    title: "Agriculture & Rural Development",
    description: "Agriculturist with BSc from KNUST, specialized in farm management, agricultural extension, and project analysis for sustainable rural transformation."
  },
  {
    icon: Lightbulb,
    title: "Human Resource Development",
    description: "M.A. holder specializing in organizational development, capacity building, and empowering individuals to reach their full potential."
  }
];


export const achievements: Achievement[] = [
  {
    title: "People's Choice Best Poet Award",
    organization: "Africa Must Read Foundation",
    year: "2024",
    description: "Honored for 'The Wanderer's Poems', an anthology of twenty-five poems reflecting on life, society, and justice."
  },
  {
    title: "First Prize - Creative Non-Fiction",
    organization: "Ghana Association of Writers",
    year: "2021",
    description: "Won the Kofi Awoonor Prize for autobiography 'Paying My Debt', chronicling a life of service and activism."
  },
  {
    title: "National May Day Best Worker Award",
    organization: "Trades Union Congress Ghana",
    year: "2018",
    description: "Recognized for exceptional leadership and dedication to protecting workers' rights as a trade unionist."
  },
  {
    title: "Indigenous Rights Leadership Honor",
    organization: "American Indian Movement (Colorado)",
    year: "2006",
    description: "Honored at traditional ceremony for exemplary leadership and commitment to protecting indigenous people's rights."
  },
  {
    title: "Peoples' International Bridge Builders Award",
    organization: "Coalition including University of Colorado",
    year: "2006",
    description: "Co-recipient of prestigious award recognizing work bridging communities and advocating for human rights."
  },
  {
    title: "Dr. J.K. Baffour-Senkyire Award",
    organization: "KNUST, Kumasi, Ghana",
    year: "1985",
    description: "Best Student in Diploma in Agricultural Extension and Farm Management Final Examinations."
  }
];

export const timeline: TimelineItem[] = [
  {
    year: "1992-1998",
    title: "Agricultural Development",
    description: "Worked with the Ministry of Food and Agriculture as District Agricultural Economist and Coordinator for Wassa West District, laying foundation for rural development work."
  },
  {
    year: "1998",
    title: "Founded Wacam",
    description: "Co-founded Wacam with wife Hannah Owusu-Koranteng, establishing a Human Rights and Environmental mining advocacy NGO that would become internationally recognized."
  },
  {
    year: "1999-2012",
    title: "Trade Union Leadership",
    description: "Served as Chief Administrative Officer of the Maritime and Dockworkers' Union, protecting rights of maritime employees and building foundation for future leadership."
  },
  {
    year: "2012-2020",
    title: "General Secretary MDU",
    description: "Elected as General Secretary of Maritime and Dockworkers' Union. Led many struggles for workers' rights, honored with Best Worker Award of TUC Ghana in 2018."
  },
  {
    year: "2014-2021",
    title: "PURC Commissioner",
    description: "Served as Commissioner of Public Utilities Regulatory Commission, representing Organised Labour and ensuring fair utility regulation for Ghanaians."
  },
  {
    year: "2020-Present",
    title: "GNAAP President",
    description: "Elected President of Ghana National Association of ADR Practitioners, leading efforts to promote alternative dispute resolution and access to justice."
  },
  {
    year: "2021",
    title: "Literary Recognition",
    description: "Won First Prize for 'Paying My Debt' at Ghana Association of Writers Literary Awards in the Creative Non-Fiction Category."
  },
  {
    year: "2024",
    title: "Best Poet Award",
    description: "Received People's Choice Best Poet Award for 'The Wanderer's Poems', sponsored by Africa Must Read Foundation."
  }
];