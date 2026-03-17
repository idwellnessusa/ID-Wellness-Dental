-- Create a table for referrals
CREATE TABLE public.referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID REFERENCES auth.users(id) NOT NULL,
  friend_name TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'completed')) DEFAULT 'pending' NOT NULL,
  reward_amount INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own referrals
CREATE POLICY "Users can view their own referrals"
  ON public.referrals
  FOR SELECT
  USING (auth.uid() = referrer_id);

-- Create policy to allow users to insert their own referrals
CREATE POLICY "Users can insert their own referrals"
  ON public.referrals
  FOR INSERT
  WITH CHECK (auth.uid() = referrer_id);

-- Create a table for patient profiles
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  dob DATE,
  phone_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own profile
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Create a trigger function to automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, full_name, dob, phone_number)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    NULLIF(new.raw_user_meta_data->>'dob', '')::date,
    new.raw_user_meta_data->>'phone_number'
  );

  -- If referred_by is present, insert a pending referral
  IF new.raw_user_meta_data->>'referred_by' IS NOT NULL THEN
    INSERT INTO public.referrals (referrer_id, friend_name, status, reward_amount)
    VALUES (
      (new.raw_user_meta_data->>'referred_by')::uuid,
      COALESCE(new.raw_user_meta_data->>'full_name', 'Unknown Friend'),
      'pending',
      0
    );
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach the trigger to the auth.users table
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
