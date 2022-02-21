import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  timestamptz: any;
  uuid: any;
};

export type Address = {
  __typename?: 'Address';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type Capsule = {
  __typename?: 'Capsule';
  dragon?: Maybe<Dragon>;
  id?: Maybe<Scalars['ID']>;
  landings?: Maybe<Scalars['Int']>;
  missions?: Maybe<Array<Maybe<CapsuleMission>>>;
  original_launch?: Maybe<Scalars['Date']>;
  reuse_count?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type CapsuleMission = {
  __typename?: 'CapsuleMission';
  flight?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type CapsulesFind = {
  id?: InputMaybe<Scalars['ID']>;
  landings?: InputMaybe<Scalars['Int']>;
  mission?: InputMaybe<Scalars['String']>;
  original_launch?: InputMaybe<Scalars['Date']>;
  reuse_count?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Core = {
  __typename?: 'Core';
  asds_attempts?: Maybe<Scalars['Int']>;
  asds_landings?: Maybe<Scalars['Int']>;
  block?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  missions?: Maybe<Array<Maybe<CapsuleMission>>>;
  original_launch?: Maybe<Scalars['Date']>;
  reuse_count?: Maybe<Scalars['Int']>;
  rtls_attempts?: Maybe<Scalars['Int']>;
  rtls_landings?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  water_landing?: Maybe<Scalars['Boolean']>;
};

export type CoresFind = {
  asds_attempts?: InputMaybe<Scalars['Int']>;
  asds_landings?: InputMaybe<Scalars['Int']>;
  block?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  missions?: InputMaybe<Scalars['String']>;
  original_launch?: InputMaybe<Scalars['Date']>;
  reuse_count?: InputMaybe<Scalars['Int']>;
  rtls_attempts?: InputMaybe<Scalars['Int']>;
  rtls_landings?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  water_landing?: InputMaybe<Scalars['Boolean']>;
};

export type Distance = {
  __typename?: 'Distance';
  feet?: Maybe<Scalars['Float']>;
  meters?: Maybe<Scalars['Float']>;
};

export type Dragon = {
  __typename?: 'Dragon';
  active?: Maybe<Scalars['Boolean']>;
  crew_capacity?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  diameter?: Maybe<Distance>;
  dry_mass_kg?: Maybe<Scalars['Int']>;
  dry_mass_lb?: Maybe<Scalars['Int']>;
  first_flight?: Maybe<Scalars['String']>;
  heat_shield?: Maybe<DragonHeatShield>;
  height_w_trunk?: Maybe<Distance>;
  id?: Maybe<Scalars['ID']>;
  launch_payload_mass?: Maybe<Mass>;
  launch_payload_vol?: Maybe<Volume>;
  name?: Maybe<Scalars['String']>;
  orbit_duration_yr?: Maybe<Scalars['Int']>;
  pressurized_capsule?: Maybe<DragonPressurizedCapsule>;
  return_payload_mass?: Maybe<Mass>;
  return_payload_vol?: Maybe<Volume>;
  sidewall_angle_deg?: Maybe<Scalars['Float']>;
  thrusters?: Maybe<Array<Maybe<DragonThrust>>>;
  trunk?: Maybe<DragonTrunk>;
  type?: Maybe<Scalars['String']>;
  wikipedia?: Maybe<Scalars['String']>;
};

export type DragonHeatShield = {
  __typename?: 'DragonHeatShield';
  dev_partner?: Maybe<Scalars['String']>;
  material?: Maybe<Scalars['String']>;
  size_meters?: Maybe<Scalars['Float']>;
  temp_degrees?: Maybe<Scalars['Int']>;
};

export type DragonPressurizedCapsule = {
  __typename?: 'DragonPressurizedCapsule';
  payload_volume?: Maybe<Volume>;
};

export type DragonThrust = {
  __typename?: 'DragonThrust';
  amount?: Maybe<Scalars['Int']>;
  fuel_1?: Maybe<Scalars['String']>;
  fuel_2?: Maybe<Scalars['String']>;
  pods?: Maybe<Scalars['Int']>;
  thrust?: Maybe<Force>;
  type?: Maybe<Scalars['String']>;
};

export type DragonTrunk = {
  __typename?: 'DragonTrunk';
  cargo?: Maybe<DragonTrunkCargo>;
  trunk_volume?: Maybe<Volume>;
};

export type DragonTrunkCargo = {
  __typename?: 'DragonTrunkCargo';
  solar_array?: Maybe<Scalars['Int']>;
  unpressurized_cargo?: Maybe<Scalars['Boolean']>;
};

export type Force = {
  __typename?: 'Force';
  kN?: Maybe<Scalars['Float']>;
  lbf?: Maybe<Scalars['Float']>;
};

export type HistoriesResult = {
  __typename?: 'HistoriesResult';
  data?: Maybe<Array<Maybe<History>>>;
  result?: Maybe<Result>;
};

export type History = {
  __typename?: 'History';
  details?: Maybe<Scalars['String']>;
  event_date_unix?: Maybe<Scalars['Date']>;
  event_date_utc?: Maybe<Scalars['Date']>;
  flight?: Maybe<Launch>;
  id?: Maybe<Scalars['ID']>;
  links?: Maybe<Link>;
  title?: Maybe<Scalars['String']>;
};

export type HistoryFind = {
  end?: InputMaybe<Scalars['Date']>;
  flight_number?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  start?: InputMaybe<Scalars['Date']>;
};

export type Info = {
  __typename?: 'Info';
  ceo?: Maybe<Scalars['String']>;
  coo?: Maybe<Scalars['String']>;
  cto?: Maybe<Scalars['String']>;
  cto_propulsion?: Maybe<Scalars['String']>;
  employees?: Maybe<Scalars['Int']>;
  founded?: Maybe<Scalars['Int']>;
  founder?: Maybe<Scalars['String']>;
  headquarters?: Maybe<Address>;
  launch_sites?: Maybe<Scalars['Int']>;
  links?: Maybe<InfoLinks>;
  name?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  test_sites?: Maybe<Scalars['Int']>;
  valuation?: Maybe<Scalars['Float']>;
  vehicles?: Maybe<Scalars['Int']>;
};

export type InfoLinks = {
  __typename?: 'InfoLinks';
  elon_twitter?: Maybe<Scalars['String']>;
  flickr?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

export type Landpad = {
  __typename?: 'Landpad';
  attempted_landings?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  full_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  landing_type?: Maybe<Scalars['String']>;
  location?: Maybe<Location>;
  status?: Maybe<Scalars['String']>;
  successful_landings?: Maybe<Scalars['String']>;
  wikipedia?: Maybe<Scalars['String']>;
};

export type Launch = {
  __typename?: 'Launch';
  details?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  is_tentative?: Maybe<Scalars['Boolean']>;
  launch_date_local?: Maybe<Scalars['Date']>;
  launch_date_unix?: Maybe<Scalars['Date']>;
  launch_date_utc?: Maybe<Scalars['Date']>;
  launch_site?: Maybe<LaunchSite>;
  launch_success?: Maybe<Scalars['Boolean']>;
  launch_year?: Maybe<Scalars['String']>;
  links?: Maybe<LaunchLinks>;
  mission_id?: Maybe<Array<Maybe<Scalars['String']>>>;
  mission_name?: Maybe<Scalars['String']>;
  rocket?: Maybe<LaunchRocket>;
  ships?: Maybe<Array<Maybe<Ship>>>;
  static_fire_date_unix?: Maybe<Scalars['Date']>;
  static_fire_date_utc?: Maybe<Scalars['Date']>;
  telemetry?: Maybe<LaunchTelemetry>;
  tentative_max_precision?: Maybe<Scalars['String']>;
  upcoming?: Maybe<Scalars['Boolean']>;
};

export type LaunchFind = {
  apoapsis_km?: InputMaybe<Scalars['Float']>;
  block?: InputMaybe<Scalars['Int']>;
  cap_serial?: InputMaybe<Scalars['String']>;
  capsule_reuse?: InputMaybe<Scalars['String']>;
  core_flight?: InputMaybe<Scalars['Int']>;
  core_reuse?: InputMaybe<Scalars['String']>;
  core_serial?: InputMaybe<Scalars['String']>;
  customer?: InputMaybe<Scalars['String']>;
  eccentricity?: InputMaybe<Scalars['Float']>;
  end?: InputMaybe<Scalars['Date']>;
  epoch?: InputMaybe<Scalars['Date']>;
  fairings_recovered?: InputMaybe<Scalars['String']>;
  fairings_recovery_attempt?: InputMaybe<Scalars['String']>;
  fairings_reuse?: InputMaybe<Scalars['String']>;
  fairings_reused?: InputMaybe<Scalars['String']>;
  fairings_ship?: InputMaybe<Scalars['String']>;
  gridfins?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  inclination_deg?: InputMaybe<Scalars['Float']>;
  land_success?: InputMaybe<Scalars['String']>;
  landing_intent?: InputMaybe<Scalars['String']>;
  landing_type?: InputMaybe<Scalars['String']>;
  landing_vehicle?: InputMaybe<Scalars['String']>;
  launch_date_local?: InputMaybe<Scalars['Date']>;
  launch_date_utc?: InputMaybe<Scalars['Date']>;
  launch_success?: InputMaybe<Scalars['String']>;
  launch_year?: InputMaybe<Scalars['String']>;
  legs?: InputMaybe<Scalars['String']>;
  lifespan_years?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  manufacturer?: InputMaybe<Scalars['String']>;
  mean_motion?: InputMaybe<Scalars['Float']>;
  mission_id?: InputMaybe<Scalars['String']>;
  mission_name?: InputMaybe<Scalars['String']>;
  nationality?: InputMaybe<Scalars['String']>;
  norad_id?: InputMaybe<Scalars['Int']>;
  orbit?: InputMaybe<Scalars['String']>;
  payload_id?: InputMaybe<Scalars['String']>;
  payload_type?: InputMaybe<Scalars['String']>;
  periapsis_km?: InputMaybe<Scalars['Float']>;
  period_min?: InputMaybe<Scalars['Float']>;
  raan?: InputMaybe<Scalars['Float']>;
  reference_system?: InputMaybe<Scalars['String']>;
  regime?: InputMaybe<Scalars['String']>;
  reused?: InputMaybe<Scalars['String']>;
  rocket_id?: InputMaybe<Scalars['String']>;
  rocket_name?: InputMaybe<Scalars['String']>;
  rocket_type?: InputMaybe<Scalars['String']>;
  second_stage_block?: InputMaybe<Scalars['String']>;
  semi_major_axis_km?: InputMaybe<Scalars['Float']>;
  ship?: InputMaybe<Scalars['String']>;
  side_core1_reuse?: InputMaybe<Scalars['String']>;
  side_core2_reuse?: InputMaybe<Scalars['String']>;
  site_id?: InputMaybe<Scalars['String']>;
  site_name?: InputMaybe<Scalars['String']>;
  site_name_long?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Date']>;
  tbd?: InputMaybe<Scalars['String']>;
  tentative?: InputMaybe<Scalars['String']>;
  tentative_max_precision?: InputMaybe<Scalars['String']>;
};

export type LaunchLinks = {
  __typename?: 'LaunchLinks';
  article_link?: Maybe<Scalars['String']>;
  flickr_images?: Maybe<Array<Maybe<Scalars['String']>>>;
  mission_patch?: Maybe<Scalars['String']>;
  mission_patch_small?: Maybe<Scalars['String']>;
  presskit?: Maybe<Scalars['String']>;
  reddit_campaign?: Maybe<Scalars['String']>;
  reddit_launch?: Maybe<Scalars['String']>;
  reddit_media?: Maybe<Scalars['String']>;
  reddit_recovery?: Maybe<Scalars['String']>;
  video_link?: Maybe<Scalars['String']>;
  wikipedia?: Maybe<Scalars['String']>;
};

export type LaunchRocket = {
  __typename?: 'LaunchRocket';
  fairings?: Maybe<LaunchRocketFairings>;
  first_stage?: Maybe<LaunchRocketFirstStage>;
  rocket?: Maybe<Rocket>;
  rocket_name?: Maybe<Scalars['String']>;
  rocket_type?: Maybe<Scalars['String']>;
  second_stage?: Maybe<LaunchRocketSecondStage>;
};

export type LaunchRocketFairings = {
  __typename?: 'LaunchRocketFairings';
  recovered?: Maybe<Scalars['Boolean']>;
  recovery_attempt?: Maybe<Scalars['Boolean']>;
  reused?: Maybe<Scalars['Boolean']>;
  ship?: Maybe<Scalars['String']>;
};

export type LaunchRocketFirstStage = {
  __typename?: 'LaunchRocketFirstStage';
  cores?: Maybe<Array<Maybe<LaunchRocketFirstStageCore>>>;
};

export type LaunchRocketFirstStageCore = {
  __typename?: 'LaunchRocketFirstStageCore';
  block?: Maybe<Scalars['Int']>;
  core?: Maybe<Core>;
  flight?: Maybe<Scalars['Int']>;
  gridfins?: Maybe<Scalars['Boolean']>;
  land_success?: Maybe<Scalars['Boolean']>;
  landing_intent?: Maybe<Scalars['Boolean']>;
  landing_type?: Maybe<Scalars['String']>;
  landing_vehicle?: Maybe<Scalars['String']>;
  legs?: Maybe<Scalars['Boolean']>;
  reused?: Maybe<Scalars['Boolean']>;
};

export type LaunchRocketSecondStage = {
  __typename?: 'LaunchRocketSecondStage';
  block?: Maybe<Scalars['Int']>;
  payloads?: Maybe<Array<Maybe<Payload>>>;
};

export type LaunchSite = {
  __typename?: 'LaunchSite';
  site_id?: Maybe<Scalars['String']>;
  site_name?: Maybe<Scalars['String']>;
  site_name_long?: Maybe<Scalars['String']>;
};

export type LaunchTelemetry = {
  __typename?: 'LaunchTelemetry';
  flight_club?: Maybe<Scalars['String']>;
};

export type LaunchesPastResult = {
  __typename?: 'LaunchesPastResult';
  data?: Maybe<Array<Maybe<Launch>>>;
  result?: Maybe<Result>;
};

export type Launchpad = {
  __typename?: 'Launchpad';
  attempted_launches?: Maybe<Scalars['Int']>;
  details?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  location?: Maybe<Location>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  successful_launches?: Maybe<Scalars['Int']>;
  vehicles_launched?: Maybe<Array<Maybe<Rocket>>>;
  wikipedia?: Maybe<Scalars['String']>;
};

export type Link = {
  __typename?: 'Link';
  article?: Maybe<Scalars['String']>;
  reddit?: Maybe<Scalars['String']>;
  wikipedia?: Maybe<Scalars['String']>;
};

export type Location = {
  __typename?: 'Location';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
};

export type Mass = {
  __typename?: 'Mass';
  kg?: Maybe<Scalars['Int']>;
  lb?: Maybe<Scalars['Int']>;
};

export type Mission = {
  __typename?: 'Mission';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  manufacturers?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  payloads?: Maybe<Array<Maybe<Payload>>>;
  twitter?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  wikipedia?: Maybe<Scalars['String']>;
};

export type MissionResult = {
  __typename?: 'MissionResult';
  data?: Maybe<Array<Maybe<Mission>>>;
  result?: Maybe<Result>;
};

export type MissionsFind = {
  id?: InputMaybe<Scalars['ID']>;
  manufacturer?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  payload_id?: InputMaybe<Scalars['String']>;
};

export type Payload = {
  __typename?: 'Payload';
  customers?: Maybe<Array<Maybe<Scalars['String']>>>;
  id?: Maybe<Scalars['ID']>;
  manufacturer?: Maybe<Scalars['String']>;
  nationality?: Maybe<Scalars['String']>;
  norad_id?: Maybe<Array<Maybe<Scalars['Int']>>>;
  orbit?: Maybe<Scalars['String']>;
  orbit_params?: Maybe<PayloadOrbitParams>;
  payload_mass_kg?: Maybe<Scalars['Float']>;
  payload_mass_lbs?: Maybe<Scalars['Float']>;
  payload_type?: Maybe<Scalars['String']>;
  reused?: Maybe<Scalars['Boolean']>;
};

export type PayloadOrbitParams = {
  __typename?: 'PayloadOrbitParams';
  apoapsis_km?: Maybe<Scalars['Float']>;
  arg_of_pericenter?: Maybe<Scalars['Float']>;
  eccentricity?: Maybe<Scalars['Float']>;
  epoch?: Maybe<Scalars['Date']>;
  inclination_deg?: Maybe<Scalars['Float']>;
  lifespan_years?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  mean_anomaly?: Maybe<Scalars['Float']>;
  mean_motion?: Maybe<Scalars['Float']>;
  periapsis_km?: Maybe<Scalars['Float']>;
  period_min?: Maybe<Scalars['Float']>;
  raan?: Maybe<Scalars['Float']>;
  reference_system?: Maybe<Scalars['String']>;
  regime?: Maybe<Scalars['String']>;
  semi_major_axis_km?: Maybe<Scalars['Float']>;
};

export type PayloadsFind = {
  apoapsis_km?: InputMaybe<Scalars['Float']>;
  customer?: InputMaybe<Scalars['String']>;
  eccentricity?: InputMaybe<Scalars['Float']>;
  epoch?: InputMaybe<Scalars['Date']>;
  inclination_deg?: InputMaybe<Scalars['Float']>;
  lifespan_years?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  manufacturer?: InputMaybe<Scalars['String']>;
  mean_motion?: InputMaybe<Scalars['Float']>;
  nationality?: InputMaybe<Scalars['String']>;
  norad_id?: InputMaybe<Scalars['Int']>;
  orbit?: InputMaybe<Scalars['String']>;
  payload_id?: InputMaybe<Scalars['ID']>;
  payload_type?: InputMaybe<Scalars['String']>;
  periapsis_km?: InputMaybe<Scalars['Float']>;
  period_min?: InputMaybe<Scalars['Float']>;
  raan?: InputMaybe<Scalars['Float']>;
  reference_system?: InputMaybe<Scalars['String']>;
  regime?: InputMaybe<Scalars['String']>;
  reused?: InputMaybe<Scalars['Boolean']>;
  semi_major_axis_km?: InputMaybe<Scalars['Float']>;
};

export type Result = {
  __typename?: 'Result';
  totalCount?: Maybe<Scalars['Int']>;
};

export type Roadster = {
  __typename?: 'Roadster';
  apoapsis_au?: Maybe<Scalars['Float']>;
  details?: Maybe<Scalars['String']>;
  earth_distance_km?: Maybe<Scalars['Float']>;
  earth_distance_mi?: Maybe<Scalars['Float']>;
  eccentricity?: Maybe<Scalars['Float']>;
  epoch_jd?: Maybe<Scalars['Float']>;
  inclination?: Maybe<Scalars['Float']>;
  launch_date_unix?: Maybe<Scalars['Date']>;
  launch_date_utc?: Maybe<Scalars['Date']>;
  launch_mass_kg?: Maybe<Scalars['Int']>;
  launch_mass_lbs?: Maybe<Scalars['Int']>;
  longitude?: Maybe<Scalars['Float']>;
  mars_distance_km?: Maybe<Scalars['Float']>;
  mars_distance_mi?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  norad_id?: Maybe<Scalars['Int']>;
  orbit_type?: Maybe<Scalars['Float']>;
  periapsis_arg?: Maybe<Scalars['Float']>;
  periapsis_au?: Maybe<Scalars['Float']>;
  period_days?: Maybe<Scalars['Float']>;
  semi_major_axis_au?: Maybe<Scalars['Float']>;
  speed_kph?: Maybe<Scalars['Float']>;
  speed_mph?: Maybe<Scalars['Float']>;
  wikipedia?: Maybe<Scalars['String']>;
};

export type Rocket = {
  __typename?: 'Rocket';
  active?: Maybe<Scalars['Boolean']>;
  boosters?: Maybe<Scalars['Int']>;
  company?: Maybe<Scalars['String']>;
  cost_per_launch?: Maybe<Scalars['Int']>;
  country?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  diameter?: Maybe<Distance>;
  engines?: Maybe<RocketEngines>;
  first_flight?: Maybe<Scalars['Date']>;
  first_stage?: Maybe<RocketFirstStage>;
  height?: Maybe<Distance>;
  id?: Maybe<Scalars['ID']>;
  landing_legs?: Maybe<RocketLandingLegs>;
  mass?: Maybe<Mass>;
  name?: Maybe<Scalars['String']>;
  payload_weights?: Maybe<Array<Maybe<RocketPayloadWeight>>>;
  second_stage?: Maybe<RocketSecondStage>;
  stages?: Maybe<Scalars['Int']>;
  success_rate_pct?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  wikipedia?: Maybe<Scalars['String']>;
};

export type RocketEngines = {
  __typename?: 'RocketEngines';
  engine_loss_max?: Maybe<Scalars['String']>;
  layout?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  propellant_1?: Maybe<Scalars['String']>;
  propellant_2?: Maybe<Scalars['String']>;
  thrust_sea_level?: Maybe<Force>;
  thrust_to_weight?: Maybe<Scalars['Float']>;
  thrust_vacuum?: Maybe<Force>;
  type?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type RocketFirstStage = {
  __typename?: 'RocketFirstStage';
  burn_time_sec?: Maybe<Scalars['Int']>;
  engines?: Maybe<Scalars['Int']>;
  fuel_amount_tons?: Maybe<Scalars['Float']>;
  reusable?: Maybe<Scalars['Boolean']>;
  thrust_sea_level?: Maybe<Force>;
  thrust_vacuum?: Maybe<Force>;
};

export type RocketLandingLegs = {
  __typename?: 'RocketLandingLegs';
  material?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
};

export type RocketPayloadWeight = {
  __typename?: 'RocketPayloadWeight';
  id?: Maybe<Scalars['String']>;
  kg?: Maybe<Scalars['Int']>;
  lb?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type RocketSecondStage = {
  __typename?: 'RocketSecondStage';
  burn_time_sec?: Maybe<Scalars['Int']>;
  engines?: Maybe<Scalars['Int']>;
  fuel_amount_tons?: Maybe<Scalars['Float']>;
  payloads?: Maybe<RocketSecondStagePayloads>;
  thrust?: Maybe<Force>;
};

export type RocketSecondStagePayloadCompositeFairing = {
  __typename?: 'RocketSecondStagePayloadCompositeFairing';
  diameter?: Maybe<Distance>;
  height?: Maybe<Distance>;
};

export type RocketSecondStagePayloads = {
  __typename?: 'RocketSecondStagePayloads';
  composite_fairing?: Maybe<RocketSecondStagePayloadCompositeFairing>;
  option_1?: Maybe<Scalars['String']>;
};

export type RocketsResult = {
  __typename?: 'RocketsResult';
  data?: Maybe<Array<Maybe<Rocket>>>;
  result?: Maybe<Result>;
};

export type Ship = {
  __typename?: 'Ship';
  abs?: Maybe<Scalars['Int']>;
  active?: Maybe<Scalars['Boolean']>;
  attempted_landings?: Maybe<Scalars['Int']>;
  class?: Maybe<Scalars['Int']>;
  course_deg?: Maybe<Scalars['Int']>;
  home_port?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['String']>;
  imo?: Maybe<Scalars['Int']>;
  missions?: Maybe<Array<Maybe<ShipMission>>>;
  mmsi?: Maybe<Scalars['Int']>;
  model?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  position?: Maybe<ShipLocation>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  speed_kn?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['String']>;
  successful_landings?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  weight_kg?: Maybe<Scalars['Int']>;
  weight_lbs?: Maybe<Scalars['Int']>;
  year_built?: Maybe<Scalars['Int']>;
};

export type ShipLocation = {
  __typename?: 'ShipLocation';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type ShipMission = {
  __typename?: 'ShipMission';
  flight?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ShipsFind = {
  abs?: InputMaybe<Scalars['Int']>;
  active?: InputMaybe<Scalars['Boolean']>;
  attempted_landings?: InputMaybe<Scalars['Int']>;
  class?: InputMaybe<Scalars['Int']>;
  course_deg?: InputMaybe<Scalars['Int']>;
  home_port?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imo?: InputMaybe<Scalars['Int']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  mission?: InputMaybe<Scalars['String']>;
  mmsi?: InputMaybe<Scalars['Int']>;
  model?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  speed_kn?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  successful_landings?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
  weight_kg?: InputMaybe<Scalars['Int']>;
  weight_lbs?: InputMaybe<Scalars['Int']>;
  year_built?: InputMaybe<Scalars['Int']>;
};

export type ShipsResult = {
  __typename?: 'ShipsResult';
  data?: Maybe<Array<Maybe<Ship>>>;
  result?: Maybe<Result>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp_Spacex = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  _nlike?: InputMaybe<Scalars['String']>;
  _nsimilar?: InputMaybe<Scalars['String']>;
  _similar?: InputMaybe<Scalars['String']>;
};

export type Volume = {
  __typename?: 'Volume';
  cubic_feet?: Maybe<Scalars['Int']>;
  cubic_meters?: Maybe<Scalars['Int']>;
};

/** columns and relationships of "cargo" */
export type Cargo = {
  __typename?: 'cargo';
  id: Scalars['uuid'];
  launchId: Scalars['String'];
  name: Scalars['String'];
  userId: Scalars['String'];
  weight: Scalars['Int'];
};

/** aggregated selection of "cargo" */
export type Cargo_Aggregate = {
  __typename?: 'cargo_aggregate';
  aggregate?: Maybe<Cargo_Aggregate_Fields>;
  nodes: Array<Cargo>;
};

/** aggregate fields of "cargo" */
export type Cargo_Aggregate_Fields = {
  __typename?: 'cargo_aggregate_fields';
  avg?: Maybe<Cargo_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Cargo_Max_Fields>;
  min?: Maybe<Cargo_Min_Fields>;
  stddev?: Maybe<Cargo_Stddev_Fields>;
  stddev_pop?: Maybe<Cargo_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Cargo_Stddev_Samp_Fields>;
  sum?: Maybe<Cargo_Sum_Fields>;
  var_pop?: Maybe<Cargo_Var_Pop_Fields>;
  var_samp?: Maybe<Cargo_Var_Samp_Fields>;
  variance?: Maybe<Cargo_Variance_Fields>;
};


/** aggregate fields of "cargo" */
export type Cargo_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Cargo_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Cargo_Avg_Fields = {
  __typename?: 'cargo_avg_fields';
  weight?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "cargo". All fields are combined with a logical 'AND'. */
export type Cargo_Bool_Exp = {
  _and?: InputMaybe<Array<Cargo_Bool_Exp>>;
  _not?: InputMaybe<Cargo_Bool_Exp>;
  _or?: InputMaybe<Array<Cargo_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  launchId?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  userId?: InputMaybe<String_Comparison_Exp>;
  weight?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "cargo" */
export enum Cargo_Constraint {
  /** unique or primary key constraint */
  CargoPkey = 'cargo_pkey'
}

/** input type for incrementing numeric columns in table "cargo" */
export type Cargo_Inc_Input = {
  weight?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "cargo" */
export type Cargo_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  launchId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Cargo_Max_Fields = {
  __typename?: 'cargo_max_fields';
  id?: Maybe<Scalars['uuid']>;
  launchId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Cargo_Min_Fields = {
  __typename?: 'cargo_min_fields';
  id?: Maybe<Scalars['uuid']>;
  launchId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "cargo" */
export type Cargo_Mutation_Response = {
  __typename?: 'cargo_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Cargo>;
};

/** on_conflict condition type for table "cargo" */
export type Cargo_On_Conflict = {
  constraint: Cargo_Constraint;
  update_columns?: Array<Cargo_Update_Column>;
  where?: InputMaybe<Cargo_Bool_Exp>;
};

/** Ordering options when selecting data from "cargo". */
export type Cargo_Order_By = {
  id?: InputMaybe<Order_By>;
  launchId?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
  weight?: InputMaybe<Order_By>;
};

/** primary key columns input for table: cargo */
export type Cargo_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "cargo" */
export enum Cargo_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LaunchId = 'launchId',
  /** column name */
  Name = 'name',
  /** column name */
  UserId = 'userId',
  /** column name */
  Weight = 'weight'
}

/** input type for updating data in table "cargo" */
export type Cargo_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  launchId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Cargo_Stddev_Fields = {
  __typename?: 'cargo_stddev_fields';
  weight?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Cargo_Stddev_Pop_Fields = {
  __typename?: 'cargo_stddev_pop_fields';
  weight?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Cargo_Stddev_Samp_Fields = {
  __typename?: 'cargo_stddev_samp_fields';
  weight?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Cargo_Sum_Fields = {
  __typename?: 'cargo_sum_fields';
  weight?: Maybe<Scalars['Int']>;
};

/** update columns of table "cargo" */
export enum Cargo_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LaunchId = 'launchId',
  /** column name */
  Name = 'name',
  /** column name */
  UserId = 'userId',
  /** column name */
  Weight = 'weight'
}

/** aggregate var_pop on columns */
export type Cargo_Var_Pop_Fields = {
  __typename?: 'cargo_var_pop_fields';
  weight?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Cargo_Var_Samp_Fields = {
  __typename?: 'cargo_var_samp_fields';
  weight?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Cargo_Variance_Fields = {
  __typename?: 'cargo_variance_fields';
  weight?: Maybe<Scalars['Float']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "cargo" */
  delete_cargo?: Maybe<Cargo_Mutation_Response>;
  /** delete single row from the table: "cargo" */
  delete_cargo_by_pk?: Maybe<Cargo>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** insert data into the table: "cargo" */
  insert_cargo?: Maybe<Cargo_Mutation_Response>;
  /** insert a single row into the table: "cargo" */
  insert_cargo_one?: Maybe<Cargo>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** update data of the table: "cargo" */
  update_cargo?: Maybe<Cargo_Mutation_Response>;
  /** update single row of the table: "cargo" */
  update_cargo_by_pk?: Maybe<Cargo>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
};


/** mutation root */
export type Mutation_RootDelete_CargoArgs = {
  where: Cargo_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Cargo_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootInsert_CargoArgs = {
  objects: Array<Cargo_Insert_Input>;
  on_conflict?: InputMaybe<Cargo_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Cargo_OneArgs = {
  object: Cargo_Insert_Input;
  on_conflict?: InputMaybe<Cargo_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_CargoArgs = {
  _inc?: InputMaybe<Cargo_Inc_Input>;
  _set?: InputMaybe<Cargo_Set_Input>;
  where: Cargo_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Cargo_By_PkArgs = {
  _inc?: InputMaybe<Cargo_Inc_Input>;
  _set?: InputMaybe<Cargo_Set_Input>;
  pk_columns: Cargo_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  capsule?: Maybe<Capsule>;
  capsules?: Maybe<Array<Maybe<Capsule>>>;
  capsulesPast?: Maybe<Array<Maybe<Capsule>>>;
  capsulesUpcoming?: Maybe<Array<Maybe<Capsule>>>;
  /** fetch data from the table: "cargo" */
  cargo: Array<Cargo>;
  /** fetch aggregated fields from the table: "cargo" */
  cargo_aggregate: Cargo_Aggregate;
  /** fetch data from the table: "cargo" using primary key columns */
  cargo_by_pk?: Maybe<Cargo>;
  company?: Maybe<Info>;
  core?: Maybe<Core>;
  cores?: Maybe<Array<Maybe<Core>>>;
  coresPast?: Maybe<Array<Maybe<Core>>>;
  coresUpcoming?: Maybe<Array<Maybe<Core>>>;
  dragon?: Maybe<Dragon>;
  dragons?: Maybe<Array<Maybe<Dragon>>>;
  histories?: Maybe<Array<Maybe<History>>>;
  historiesResult?: Maybe<HistoriesResult>;
  history?: Maybe<History>;
  landpad?: Maybe<Landpad>;
  landpads?: Maybe<Array<Maybe<Landpad>>>;
  launch?: Maybe<Launch>;
  launchLatest?: Maybe<Launch>;
  launchNext?: Maybe<Launch>;
  launches?: Maybe<Array<Maybe<Launch>>>;
  launchesPast?: Maybe<Array<Maybe<Launch>>>;
  launchesPastResult?: Maybe<LaunchesPastResult>;
  launchesUpcoming?: Maybe<Array<Maybe<Launch>>>;
  launchpad?: Maybe<Launchpad>;
  launchpads?: Maybe<Array<Maybe<Launchpad>>>;
  mission?: Maybe<Mission>;
  missions?: Maybe<Array<Maybe<Mission>>>;
  missionsResult?: Maybe<MissionResult>;
  payload?: Maybe<Payload>;
  payloads?: Maybe<Array<Maybe<Payload>>>;
  roadster?: Maybe<Roadster>;
  rocket?: Maybe<Rocket>;
  rockets?: Maybe<Array<Maybe<Rocket>>>;
  rocketsResult?: Maybe<RocketsResult>;
  ship?: Maybe<Ship>;
  ships?: Maybe<Array<Maybe<Ship>>>;
  shipsResult?: Maybe<ShipsResult>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootCapsuleArgs = {
  id: Scalars['ID'];
};


export type Query_RootCapsulesArgs = {
  find?: InputMaybe<CapsulesFind>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type Query_RootCapsulesPastArgs = {
  find?: InputMaybe<CapsulesFind>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type Query_RootCapsulesUpcomingArgs = {
  find?: InputMaybe<CapsulesFind>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type Query_RootCargoArgs = {
  distinct_on?: InputMaybe<Array<Cargo_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cargo_Order_By>>;
  where?: InputMaybe<Cargo_Bool_Exp>;
};


export type Query_RootCargo_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cargo_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cargo_Order_By>>;
  where?: InputMaybe<Cargo_Bool_Exp>;
};


export type Query_RootCargo_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCoreArgs = {
  id: Scalars['ID'];
};


export type Query_RootCoresArgs = {
  find?: InputMaybe<CoresFind>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type Query_RootCoresPastArgs = {
  find?: InputMaybe<CoresFind>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type Query_RootCoresUpcomingArgs = {
  find?: InputMaybe<CoresFind>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type Query_RootDragonArgs = {
  id: Scalars['ID'];
};


export type Query_RootDragonsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type Query_RootHistoriesArgs = {
  find?: InputMaybe<HistoryFind>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type Query_RootHistoriesResultArgs = {
  find?: InputMaybe<HistoryFind>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type Query_RootHistoryArgs = {
  id: Scalars['ID'];
};


export type Query_RootLandpadArgs = {
  id: Scalars['ID'];
};


export type Query_RootLandpadsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type Query_RootLaunchArgs = {
  id: Scalars['ID'];
};


export type Query_RootLaunchLatestArgs = {
  offset?: InputMaybe<Scalars['Int']>;
};


export type Query_RootLaunchNextArgs = {
  offset?: InputMaybe<Scalars['Int']>;
};


export type Query_RootLaunchesArgs = {
  find?: InputMaybe<LaunchFind>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type Query_RootLaunchesPastArgs = {
  find?: InputMaybe<LaunchFind>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type Query_RootLaunchesPastResultArgs = {
  find?: InputMaybe<LaunchFind>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type Query_RootLaunchesUpcomingArgs = {
  find?: InputMaybe<LaunchFind>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type Query_RootLaunchpadArgs = {
  id: Scalars['ID'];
};


export type Query_RootLaunchpadsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type Query_RootMissionArgs = {
  id: Scalars['ID'];
};


export type Query_RootMissionsArgs = {
  find?: InputMaybe<MissionsFind>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type Query_RootMissionsResultArgs = {
  find?: InputMaybe<MissionsFind>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type Query_RootPayloadArgs = {
  id: Scalars['ID'];
};


export type Query_RootPayloadsArgs = {
  find?: InputMaybe<PayloadsFind>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type Query_RootRocketArgs = {
  id: Scalars['ID'];
};


export type Query_RootRocketsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type Query_RootRocketsResultArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type Query_RootShipArgs = {
  id: Scalars['ID'];
};


export type Query_RootShipsArgs = {
  find?: InputMaybe<ShipsFind>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type Query_RootShipsResultArgs = {
  find?: InputMaybe<ShipsFind>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "cargo" */
  cargo: Array<Cargo>;
  /** fetch aggregated fields from the table: "cargo" */
  cargo_aggregate: Cargo_Aggregate;
  /** fetch data from the table: "cargo" using primary key columns */
  cargo_by_pk?: Maybe<Cargo>;
};


export type Subscription_RootCargoArgs = {
  distinct_on?: InputMaybe<Array<Cargo_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cargo_Order_By>>;
  where?: InputMaybe<Cargo_Bool_Exp>;
};


export type Subscription_RootCargo_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cargo_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cargo_Order_By>>;
  where?: InputMaybe<Cargo_Bool_Exp>;
};


export type Subscription_RootCargo_By_PkArgs = {
  id: Scalars['uuid'];
};

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  rocket?: Maybe<Scalars['String']>;
  timestamp: Scalars['timestamptz'];
  twitter?: Maybe<Scalars['String']>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Users_Bool_Exp>>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Users_Bool_Exp>>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp_Spacex>;
  rocket?: InputMaybe<String_Comparison_Exp_Spacex>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  twitter?: InputMaybe<String_Comparison_Exp_Spacex>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  rocket?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['timestamptz']>;
  twitter?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  name?: Maybe<Scalars['String']>;
  rocket?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  twitter?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  name?: Maybe<Scalars['String']>;
  rocket?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  twitter?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
};

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  rocket?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  twitter?: InputMaybe<Order_By>;
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Rocket = 'rocket',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  Twitter = 'twitter'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  rocket?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['timestamptz']>;
  twitter?: InputMaybe<Scalars['String']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Rocket = 'rocket',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  Twitter = 'twitter'
}

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type PastLaunchesListQueryVariables = Exact<{
  limit?: Scalars['Int'];
}>;


export type PastLaunchesListQuery = { __typename?: 'query_root', launchesPast?: Array<{ __typename?: 'Launch', id?: string | null, mission_name?: string | null, links?: { __typename?: 'LaunchLinks', flickr_images?: Array<string | null> | null, mission_patch?: string | null } | null, rocket?: { __typename?: 'LaunchRocket', rocket_name?: string | null } | null } | null> | null };

export type LaunchDetailsFragment = { __typename?: 'Launch', id?: string | null, mission_name?: string | null, details?: string | null, links?: { __typename?: 'LaunchLinks', flickr_images?: Array<string | null> | null, mission_patch?: string | null } | null };

export type CargoWeightCapacityFragment = { __typename?: 'Launch', rocket?: { __typename?: 'LaunchRocket', rocket?: { __typename?: 'Rocket', payload_weights?: Array<{ __typename?: 'RocketPayloadWeight', id?: string | null, lb?: number | null } | null> | null } | null } | null };

export type CurrentCargoWeightFragment = { __typename?: 'cargo_aggregate', aggregate?: { __typename?: 'cargo_aggregate_fields', sum?: { __typename?: 'cargo_sum_fields', weight?: number | null } | null } | null };

export type AnonymousLaunchDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AnonymousLaunchDetailsQuery = { __typename?: 'query_root', launch?: { __typename?: 'Launch', id?: string | null, mission_name?: string | null, details?: string | null, links?: { __typename?: 'LaunchLinks', flickr_images?: Array<string | null> | null, mission_patch?: string | null } | null } | null };

export type UserLaunchDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
  launchId: Scalars['String'];
}>;


export type UserLaunchDetailsQuery = { __typename?: 'query_root', launch?: { __typename?: 'Launch', id?: string | null, mission_name?: string | null, details?: string | null, links?: { __typename?: 'LaunchLinks', flickr_images?: Array<string | null> | null, mission_patch?: string | null } | null, rocket?: { __typename?: 'LaunchRocket', rocket?: { __typename?: 'Rocket', payload_weights?: Array<{ __typename?: 'RocketPayloadWeight', id?: string | null, lb?: number | null } | null> | null } | null } | null } | null, cargo: Array<{ __typename?: 'cargo', id: any, weight: number, name: string }>, cargo_aggregate: { __typename?: 'cargo_aggregate', aggregate?: { __typename?: 'cargo_aggregate_fields', sum?: { __typename?: 'cargo_sum_fields', weight?: number | null } | null } | null } };

export type CurrentCargoInfoQueryVariables = Exact<{
  id: Scalars['ID'];
  launchId: Scalars['String'];
}>;


export type CurrentCargoInfoQuery = { __typename?: 'query_root', launch?: { __typename?: 'Launch', rocket?: { __typename?: 'LaunchRocket', rocket?: { __typename?: 'Rocket', payload_weights?: Array<{ __typename?: 'RocketPayloadWeight', id?: string | null, lb?: number | null } | null> | null } | null } | null } | null, cargo_aggregate: { __typename?: 'cargo_aggregate', aggregate?: { __typename?: 'cargo_aggregate_fields', sum?: { __typename?: 'cargo_sum_fields', weight?: number | null } | null } | null } };

export type AddCargoMutationVariables = Exact<{
  cargo: Cargo_Insert_Input;
}>;


export type AddCargoMutation = { __typename?: 'mutation_root', insert_cargo_one?: { __typename?: 'cargo', id: any } | null };

export const LaunchDetailsFragmentDoc = gql`
    fragment LaunchDetails on Launch {
  id
  mission_name
  details
  links {
    flickr_images
    mission_patch
  }
}
    `;
export const CargoWeightCapacityFragmentDoc = gql`
    fragment CargoWeightCapacity on Launch {
  rocket {
    rocket {
      payload_weights {
        id
        lb
      }
    }
  }
}
    `;
export const CurrentCargoWeightFragmentDoc = gql`
    fragment CurrentCargoWeight on cargo_aggregate {
  aggregate {
    sum {
      weight
    }
  }
}
    `;
export const PastLaunchesListDocument = gql`
    query pastLaunchesList($limit: Int! = 10) {
  launchesPast(limit: $limit, sort: "launch_date_utc", order: "DESC") {
    id
    mission_name
    links {
      flickr_images
      mission_patch
    }
    rocket {
      rocket_name
    }
  }
}
    `;
export const AnonymousLaunchDetailsDocument = gql`
    query AnonymousLaunchDetails($id: ID!) {
  launch(id: $id) {
    ...LaunchDetails
  }
}
    ${LaunchDetailsFragmentDoc}`;
export const UserLaunchDetailsDocument = gql`
    query UserLaunchDetails($id: ID!, $launchId: String!) {
  launch(id: $id) {
    ...LaunchDetails
    ...CargoWeightCapacity
  }
  cargo(where: {launchId: {_eq: $launchId}}) {
    id
    weight
    name
  }
  cargo_aggregate(where: {launchId: {_eq: $launchId}}) {
    ...CurrentCargoWeight
  }
}
    ${LaunchDetailsFragmentDoc}
${CargoWeightCapacityFragmentDoc}
${CurrentCargoWeightFragmentDoc}`;
export const CurrentCargoInfoDocument = gql`
    query CurrentCargoInfo($id: ID!, $launchId: String!) {
  launch(id: $id) {
    ...CargoWeightCapacity
  }
  cargo_aggregate(where: {launchId: {_eq: $launchId}}) {
    ...CurrentCargoWeight
  }
}
    ${CargoWeightCapacityFragmentDoc}
${CurrentCargoWeightFragmentDoc}`;
export const AddCargoDocument = gql`
    mutation AddCargo($cargo: cargo_insert_input!) {
  insert_cargo_one(object: $cargo) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    pastLaunchesList(variables?: PastLaunchesListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PastLaunchesListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PastLaunchesListQuery>(PastLaunchesListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'pastLaunchesList');
    },
    AnonymousLaunchDetails(variables: AnonymousLaunchDetailsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AnonymousLaunchDetailsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AnonymousLaunchDetailsQuery>(AnonymousLaunchDetailsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AnonymousLaunchDetails');
    },
    UserLaunchDetails(variables: UserLaunchDetailsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserLaunchDetailsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserLaunchDetailsQuery>(UserLaunchDetailsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UserLaunchDetails');
    },
    CurrentCargoInfo(variables: CurrentCargoInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CurrentCargoInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CurrentCargoInfoQuery>(CurrentCargoInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CurrentCargoInfo');
    },
    AddCargo(variables: AddCargoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddCargoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddCargoMutation>(AddCargoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddCargo');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;