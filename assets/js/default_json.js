const teamData = [
  {
    teamImageUrl: "https://iili.io/HNNQShx.jpg",
    teamName: "Chennai Super Kings",
    address: { area: "aminjikarai", distric: "chennai" },
    dateOfJoin: "2023-03-08T13:09:13.829Z",
    uniqueId: "22c81ffd-0a9e-404a-b9a6-55abea873ae2",
    about: "Hi team",
    openForPlayers: { status: true, description: "we need some good bolwers" },
    teamMembers: ["9344655211", "9344655219", "9344655220", "9344655221"],
  },
  {
    teamImageUrl:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    teamName: "Indians",
    address: { area: "aminjikarai", distric: "chennai" },
    dateOfJoin: "2023-03-08T13:13:33.890Z",
    uniqueId: "ea73eb8e-ff5a-46e4-9e9d-646de4567734",
    about: "hi",
    openForPlayers: { status: true, description: "hi" },
    teamMembers: ["9344655212"],
  },
  {
    teamImageUrl: "https://iili.io/HWEqLtp.webp",
    teamName: "attackers",
    address: { area: "annanagar", distric: "chennai" },
    dateOfJoin: "2023-03-08T15:10:01.050Z",
    uniqueId: "f7b05118-3c2f-4929-9f20-9cdf953c76f0",
    about: "hi",
    openForPlayers: { status: true, description: "Summa oru team" },
    teamMembers: ["9344655213"],
  },
];

const request = [
  {
    responseUniqueId: "32d48754-d9db-4567-ada7-3c48bae8c110",
    playerUniqueId: "9344655219",
    teamUniqueId: "22c81ffd-0a9e-404a-b9a6-55abea873ae2",
    createdTime: "2023-03-17T09:43:47.542Z",
    requestStatus: 1,
  },
  {
    responseUniqueId: "51a48754-c9db-6567-eda7-3c48bae8c110",
    playerUniqueId: "9344655220",
    teamUniqueId: "22c81ffd-0a9e-404a-b9a6-55abea873ae2",
    createdTime: "2023-03-18T09:43:47.542Z",
    requestStatus: 1,
  },
  {
    responseUniqueId: "45c18754-fqdb-2167-eda7-3c48bae8c110",
    playerUniqueId: "9344655221",
    teamUniqueId: "22c81ffd-0a9e-404a-b9a6-55abea873ae2",
    createdTime: "2023-03-19T09:43:47.542Z",
    requestStatus: 1,
  },
];

const area = [
  { area: "aminjikarai", distric: "chennai", count: 2 },
  { area: "annanagar", distric: "chennai", count: 1 },
];

const players = [
  {
    phoneNumber: "9344655211",
    userName: "Dhoni",
    password: "Aa!1aaaa",
    confirmPassword: "Aa!1aaaa",
    dateOFBirth: "2001-02-08",
    gender: "Male",
    game: "Cricket",
    area: "aminjikarai",
    distric: "chennai",
    createDate: "2023-03-08T13:07:49.971Z",
    firstName: "MahendraSingh",
    lastName: "Dhoni",
    about: "Ennam pol valkkai",
    imageUrl: "https://iili.io/HWhKUrB.webp",
    captainStatus: 1,
    uniqueId: "233255ef-241a-43ac-9e4d-d7b39184bca4",
  },
  {
    phoneNumber: "9344655212",
    userName: "Raina",
    password: "Aa!1aaaa",
    confirmPassword: "Aa!1aaaa",
    dateOFBirth: "2001-06-08",
    gender: "Male",
    game: "Cricket",
    area: "aminjikarai",
    distric: "chennai",
    createDate: "2023-03-08T13:11:43.346Z",
    firstName: "Suresh",
    lastName: "Raina",
    about: "",
    imageUrl: "https://iili.io/HWhKUrB.webp",
    captainStatus: 1,
    uniqueId: "c0df5b41-65c1-4ca8-827a-c7a92a3024a8",
  },
  {
    phoneNumber: "9344655213",
    userName: "Gambir",
    password: "Aa!1aaaa",
    confirmPassword: "Aa!1aaaa",
    dateOFBirth: "2001-02-08",
    gender: "Male",
    game: "Cricket",
    area: "annanagar",
    distric: "chennai",
    createDate: "2023-03-08T15:09:21.979Z",
    firstName: "",
    lastName: "",
    about: "",
    imageUrl: "https://iili.io/HWhKUrB.webp",
    captainStatus: 1,
    uniqueId: "3df48411-09b5-48e8-97eb-ccfd2dab7f7e",
  },
  {
    phoneNumber: "9344655219",
    userName: "kalasnikkal",
    password: "Aa!1aaaa",
    confirmPassword: "Aa!1aaaa",
    dateOFBirth: "2003-03-07",
    gender: "Male",
    game: "Cricket",
    area: "annanagar",
    distric: "chennai",
    createDate: "2023-03-17T09:43:40.153Z",
    firstName: "kamesh",
    lastName: "waran",
    about: "KGF",
    imageUrl: "https://iili.io/Ho1PN8Q.jpg",
    captainStatus: 0,
    uniqueId: "83fc7a2d-099f-47ec-b4f4-8e27708be5ae",
  },
  {
    phoneNumber: "9344655220",
    userName: "Vicky",
    password: "Aa!1aaaa",
    confirmPassword: "Aa!1aaaa",
    dateOFBirth: "2003-05-01",
    gender: "Male",
    game: "Cricket",
    area: "annanagar",
    distric: "chennai",
    createDate: "2023-03-18T09:43:40.153Z",
    firstName: "Vignesh",
    lastName: "waran",
    about: "KGF",
    imageUrl: "https://iili.io/HWhKUrB.webp",
    captainStatus: 0,
    uniqueId: "75d17a2d-099f-17ec-a4f4-8e27708be5ae",
  },
  {
    phoneNumber: "9344655221",
    userName: "Gopi",
    password: "Aa!1aaaa",
    confirmPassword: "Aa!1aaaa",
    dateOFBirth: "2001-03-01",
    gender: "Male",
    game: "Cricket",
    area: "annanagar",
    distric: "chennai",
    createDate: "2023-03-19T09:43:40.153Z",
    firstName: "Gopi",
    lastName: "Krishnan",
    about: "KGF",
    imageUrl: "https://iili.io/Ho1PN8Q.jpg",
    captainStatus: 0,
    uniqueId: "26r57a2d-099f-37ec-f4f4-8e27708be5ae",
  },
];

const local_team = localStorage.getItem("team_details_list");

if (!local_team) {
  localStorage.setItem("team_details_list", JSON.stringify(teamData));
}

const local_request = localStorage.getItem("response_list");

if (!local_request) {
  localStorage.setItem("response_list", JSON.stringify(request));
}

const local_area = localStorage.getItem("area_list");

if (!local_area) {
  localStorage.setItem("area_list", JSON.stringify(area));
}

const local_players = localStorage.getItem("user_detail");

if (!local_players) {
  localStorage.setItem("user_detail", JSON.stringify(players));
}
