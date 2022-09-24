'use strict';

const { SpotImage } = require('../models');

const images = [
  {
    spotId: 1,
    url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Zm9yZXN0JTIwaG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 1,
    url: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8aW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 1,
    url: 'https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGludGVyaW9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 1,
    url: 'https://images.unsplash.com/photo-1551298213-de5c034f5d50?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 1,
    url: 'https://images.unsplash.com/photo-1507149833265-60c372daea22?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 2,
    url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Zm9yZXN0JTIwaG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 2,
    url: 'https://images.unsplash.com/photo-1601907560526-d679c8ed95ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fGludGVyaW9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 2,
    url: 'https://images.unsplash.com/photo-1581784878214-8d5596b98a01?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjF8fGludGVyaW9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 2,
    url: 'https://images.unsplash.com/photo-1622372738946-62e02505feb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fGludGVyaW9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 2,
    url: 'https://images.unsplash.com/photo-1614349164218-1e05fe55b825?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODJ8fGludGVyaW9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 3,
    url: 'https://images.unsplash.com/photo-1611602132416-da2045990f76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZvcmVzdCUyMGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 3,
    url: 'https://images.unsplash.com/photo-1601628828689-9e5c1b75fff0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzl8fGludGVyaW9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 3,
    url: 'https://images.unsplash.com/photo-1571387384064-ed3f73470065?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODd8fGludGVyaW9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 3,
    url: 'https://images.unsplash.com/photo-1600093328589-39ed150b382b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODV8fGludGVyaW9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 3,
    url: 'https://images.unsplash.com/photo-1615920606214-6428b3324c74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzV8fGludGVyaW9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 4,
    url: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 4,
    url: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI4fHxpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 4,
    url: 'https://images.unsplash.com/photo-1600607687126-8a3414349a51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTMzfHxpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 4,
    url: 'https://images.unsplash.com/photo-1568377210220-151e1d7f42c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTUzfHxpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 4,
    url: 'https://images.unsplash.com/photo-1600488999585-e4364713b90a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY0fHxpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 5,
    url: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fGhvdXNlfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 5,
    url: 'https://images.unsplash.com/photo-1622372738946-62e02505feb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJpb3J8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 5,
    url: 'https://images.unsplash.com/photo-1519642918688-7e43b19245d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTk0fHxpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 5,
    url: 'https://images.unsplash.com/photo-1604014237744-2f4ab6bfbcc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjIwfHxpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 5,
    url: 'https://images.unsplash.com/photo-1602503206634-9a39fccff9b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjIzfHxpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 6,
    url: 'https://images.unsplash.com/photo-1597211833712-5e41faa202ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 6,
    url: 'https://images.unsplash.com/photo-1509610696553-9243c1e230f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aGF3YWlpfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 6,
    url: 'https://images.unsplash.com/photo-1599351329996-7a151ed565c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGhhd2FpaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 6,
    url: 'https://images.unsplash.com/photo-1572859704906-ab0716da285f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGhhd2FpaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 6,
    url: 'https://images.unsplash.com/photo-1547856699-f13e904de06c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDN8fGhhd2FpaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 7,
    url: 'https://images.unsplash.com/photo-1623883282543-067fbe8c85e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzbmV5bGFuZHxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 7,
    url: 'https://images.unsplash.com/photo-1591134654008-e0ec39e7267a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRpc25leWxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 7,
    url: 'https://images.unsplash.com/photo-1545580492-8859ba8323f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGlzbmV5bGFuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 7,
    url: 'https://images.unsplash.com/photo-1581909199603-0de32b43ffd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGRpc25leWxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 7,
    url: 'https://images.unsplash.com/photo-1663250714102-4437531f5050?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZGlzbmV5bGFuZHxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 8,
    url: 'https://images.unsplash.com/photo-1576493169316-0745093ae312?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fGhvdXNlfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 8,
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 8,
    url: 'https://images.unsplash.com/photo-1600493505371-f2f6153dbb29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 8,
    url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 8,
    url: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGludGVyaW9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 9,
    url: 'https://images.unsplash.com/photo-1557434440-5af89df2cb64?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODh8fGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 9,
    url: 'https://images.unsplash.com/photo-1540809799-5da9372c3f64?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGludGVyaW9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 9,
    url: 'https://images.unsplash.com/photo-1596079890687-58c51d24889a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGludGVyaW9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 9,
    url: 'https://images.unsplash.com/photo-1581970697654-ded78d0cea3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGludGVyaW9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 9,
    url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fGludGVyaW9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 10,
    url: 'https://images.unsplash.com/photo-1595877244574-e90ce41ce089?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTd8fGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 10,
    url: 'https://images.unsplash.com/photo-1617214922084-5db8d3c3df5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODZ8fGludGVyaW9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 10,
    url: 'https://images.unsplash.com/photo-1597935258735-285ded529e93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTR8fGludGVyaW9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 10,
    url: 'https://images.unsplash.com/photo-1599327286062-40b0a7f2b305?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTIwfHxpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 10,
    url: 'https://images.unsplash.com/photo-1599243272864-e9dd455966bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTc5fHxpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 11,
    url: 'https://images.unsplash.com/photo-1597211833712-5e41faa202ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTEwfHxob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 11,
    url: 'https://images.unsplash.com/photo-1601629077420-4b784a584094?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTg1fHxpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 11,
    url: 'https://images.unsplash.com/photo-1607809714110-e34f71c7b2ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTkxfHxpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 11,
    url: 'https://images.unsplash.com/photo-1531125227120-bac862d2aeb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjMyfHxpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 11,
    url: 'https://images.unsplash.com/photo-1616137507072-f7276b168614?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjUyfHxpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 12,
    url: 'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI1fHxob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 12,
    url: 'https://images.unsplash.com/photo-1565031491910-e57fac031c41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjcxfHxpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 12,
    url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjc2fHxpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 12,
    url: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjgzfHxpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 12,
    url: 'https://images.unsplash.com/photo-1533630654593-b222d5d44449?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzExfHxpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 13,
    url: 'https://images.unsplash.com/photo-1589694502732-74708bde4e3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHJvY2t8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 13,
    url: 'https://images.unsplash.com/photo-1649351114127-80f193f281d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3RhcmZpc2h8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 13,
    url: 'https://images.unsplash.com/photo-1629635174638-8dec3c0e6a1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fHJvY2t8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 13,
    url: 'https://images.unsplash.com/photo-1527256035292-ce404f6c704f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTd8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 13,
    url: 'https://images.unsplash.com/photo-1472744999594-0b7b822e5698?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 14,
    url: 'https://images.unsplash.com/photo-1570793005386-840846445fed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQ1fHxob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 14,
    url: 'https://images.unsplash.com/photo-1608626597747-0d9b8884972c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fGhvbWUlMjBpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 14,
    url: 'https://images.unsplash.com/photo-1565031491910-e57fac031c41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODF8fGhvbWUlMjBpbnRlcmlvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 14,
    url: 'https://images.unsplash.com/photo-1572909103966-181b2f8e7e84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTM0fHxob21lJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 14,
    url: 'https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU0fHxob21lJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 15,
    url: 'https://images.unsplash.com/photo-1591825336242-9e4a7fc30b29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTc2fHxob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    preview: true
  },
  {
    spotId: 15,
    url: 'https://images.unsplash.com/photo-1600447634369-e6bf93c83435?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTYxfHxob21lJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 15,
    url: 'https://images.unsplash.com/photo-1570451487767-4b63e1966460?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY3fHxob21lJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 15,
    url: 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTcyfHxob21lJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 15,
    url: 'https://images.unsplash.com/photo-1612193363213-2f8d65748925?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTc3fHxob21lJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate(images, {
      validate: true
    })
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    for (let imageInfo of images) {
      await SpotImage.destroy({
        where: imageInfo
      });
    }
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
