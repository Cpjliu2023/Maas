const request = require('supertest');
const app = require('../app');  // Adjust the path based on your project structure

const { generateRandomMeme } = require('../utils/memeGenerator');

describe('generateRandomMeme', () => {
  it('should generate a meme object with valid properties', () => {
    const meme = generateRandomMeme();

    // Check if the generated meme has the required properties
    expect(meme).toHaveProperty('id');
    expect(meme).toHaveProperty('text');
    expect(meme).toHaveProperty('imageUrl');

    // Check if the meme ID is a number
    expect(typeof meme.id).toBe('number');

    // Check if the meme text is a string and not empty
    expect(typeof meme.text).toBe('string');
    expect(meme.text).not.toBe('');

    // Check if the meme imageUrl is a string and not empty
    expect(typeof meme.imageUrl).toBe('string');
    expect(meme.imageUrl).not.toBe('');
  });

  it('should replace placeholders in meme text', () => {
    const meme = generateRandomMeme();

    // Check if placeholders are replaced in the meme text
    expect(meme.text.includes('{day}')).toBe(false);
    expect(meme.text.includes('{food}')).toBe(false);
    expect(meme.text.includes('{name}')).toBe(false);
    expect(meme.text.includes('{quote}')).toBe(false);
  });
});
