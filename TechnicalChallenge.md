# Approach

I was strict and didn't Google!! I followed the the very unsophisticated process I use in my head. The code is fairly
readable because it's a simplistic process, but comments have been added for extra clarity.

I started with tests; I had a hardcoded test that checked the values between 1 and 10. Once I had that I manually
extended the test to 20, 30 and the first few 50s. At that point I found a library on NPM that converts arabic to roman
and updated the test to run all the numbers between 1 and 3999 and compare my result with the library.

About half way through I installed eslint to check I wasn't doing anything stupid. I use it to check for bugs rather than
styling. I hadn't come across the no-plusplus rule before and it makes sense!

# Caveats

I Googled after I'd finished - mine looks pretty crude compared! It's obviously a far from optimal implementation.