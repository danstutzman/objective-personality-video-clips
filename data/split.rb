#!/usr/bin/env ruby
require 'pp'
require 'csv'

label2clips = {}

filename = 'Objective Personality_ YouTube clips - Sheet1.tsv'
File.open(filename).each_line do |line|
  next if line.start_with?('Class')

  clip = line.strip.split("\t")

  labels = (clip[9] || '').split(', ')
  labels.each do |label|
    label2clips[label] ||= []
    label2clips[label].push clip
  end
end

CSV(STDOUT) do |csv|
  csv << [
    'Function/Animal/Modality',
    'Class Number',
    'Subject Name',
    "Subject's Full Type",
    "Which Class Video",
    "Class Start Time",
    "Class End Time",
    "YouTube Link",
    "YouTube End Time"
  ]
  label2clips.keys.sort_by { |key| key.upcase }.each do |label|
    label2clips[label].sort_by { |clip| clip[0].to_i }.each do |clip|
      class_num, subject_name, subject_full_type, class_video_num,
        class_start_time, class_end_time, youtube_id, youtube_start_time,
        youtube_end_time, _ = clip

      next if youtube_start_time == '-'
      h, m, s = youtube_start_time.split(':')
      h, m, s = h.to_i, m.to_i, s.to_i
      youtube_start = h * 3600 + m * 60 + s

      youtube_link = "https://youtu.be/#{youtube_id}?start=#{youtube_start}"

      csv << [
        label,
        class_num,
        subject_name,
        subject_full_type,
        class_video_num,
        class_start_time,
        class_end_time,
        youtube_link,
        youtube_end_time
      ]
    end
  end
end
