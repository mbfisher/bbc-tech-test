1. We're looking for people with a real passion for collaboratively creating great software. Please give an example
of a software component you have designed and written from concept to deployment, outlining the steps you took.

I worked on a Civil Service team that built a system that scanned files for keywords. Keyword "dictionaries" were provided
to us that included around 20,000 keywords in total. The system had to have a user interface that allowed users to upload
files and see the results of the scan, and an API that allowed other systems to interact with it programatically.

I was the team lead and so lead high level design of the system. I chose a Single Page App architecture; a HTTP REST API
written in Java and a JavaScript UI running in a browser. This architecture allowed us to expose a scanning API that the
UI and other systems could interact with. It also gave us much more control over deployment than a fat client approach,
which had been used extensively throughout the department.

I designed a basic scanning implementation that extracted text from submitted files and split the text up into chunks that
could be scanned concurrently. I put together a diagram describing Java interfaces and how they interacted with each other,
and frequently ran this design past the team and other senior engineers for feedback. The diagram was then used as a basis
to plan how the work could be carried out by the team.

After some initial "Sprint 0" set up work we used Scrum to incrementally build the system. We collaborated closely as a
team - it was tricky to split the design up in to units of work that could be built independently, so plenty of communication
was required.

We used Jenkins to build the API and UI components of the system and orchestrate deployment with Docker. We had a simple
Nginx entry point that routed requests to the API or UI based on URI path, using Consul for service discovery.

2. Using the example that you provided above, tell us about a significant decision you made to solve a technical challenge.
Give details of technologies that you chose and why you chose them.

In order to scan files for keywords we needed to extract the text content in them. Rather that implement this ourselves
I decided to use Apache Tika, an open source library that identifies file types and extracts text from them accordingly.
This gave us support for a wide range of file types with little implementation effort, which was a big win.

We received a new requirement to scan archives. For example if a ZIP file was submitted the system was to unarchive it and
scan each file within it, associating keyword hits with the files within the archive. Tika had support for archives, and
compression, but returned the text content for an entire archive, meaning we couldn't link keyword hits back to individual
files.

I designed an additional layer to the scanning system that identified archives and unpacked them, forwarding individual
files on to the layer that parsed text and then on to the concurrent keyword scanners. Identifying archives is harder than
you'd expect and Java's APIs are unpleasant! For example, the only way we found to determine if a file was a ZIP was to
attempt to parse it with Java's ZIP library, which would throw an unchecked exception if the file wasn't a ZIP.

This process also affected the performance of the system significantly. Before supporting archives we had used Spring
Boot's support for multipart uploads that allowed us to stream file content into our scanning algorithm as it was being
uploaded, minimising the amount of data we had to store in memory or on disk. In order to identify and extract archives we
needed the entire file, not just a stream. We used Spring's multipart support to stream uploaded files to the temporary
filesystem, extracted them on disk and then streamed each one through our scanning system, minimising the amount of data in
memory.

The archive requirements became recursive - users needed to able to scan ZIPs containing more ZIPs, which contain gzipped
tarballs etc. The filesystem approach worked well for this - each nested archive was extracted to disk. We were also able to
add another layer of concurrency - each file extracted from an archive could be further extracted in a new thread.

3. Using the example that you provided above, tell us about how you ensured your software was fit for purpose and of high
quality. What did you learn and what would you do differently next time to do a better job?

I encouraged the team to use TDD to build the system. Most of them were relatively inexperienced and I knew that writing
testable code is a skill in it's own right, and I had found TDD a valuable learning tool early in my career. We used JaCoCo
to gather test coverage stats and SonarQube to keep track of the test coverage of each branch. To begin with I set the team
the challenge of hitting 100% test coverage as a way of enforcing a test driven approach. This was my first Java project,
having come from PHP, and it ended up being a lot more work to hit 100% with a statically typed language than I expected!
We were writing tests for default constructors, getters and setters and private exceptions that had didn't add value and didn't
evaluate the business logic. I knew that coverage stats weren't representative of a quality test suite and this was a great
example in practice. We scaled back the coverage threshold to 90% and worked together to come up with more sensible testing
strategies for features as they came along.

We use code review throughout the department to help keep code quality high. We encourage everyone to get involved in
assessing each others code. It was much more effective to discuss testing strategy and coverage of a new feature at review
time and make changes accordingly rather than enforce an arbitrary coverage threshold. Encouraging all team members to get
involved in review also helped to spread knowledge of the system throughout the whole team. This "flat hierarchy" had it's
disadvantages. Inexperienced reviewers were approving questionable code and the code base as a whole became fragmented over
time without a guiding influence keeping everyone on the same path.

We used Agile methodologies to help us make sure we were building the right thing for our customers. We demoed regularly
to stakeholders and incorporated their feedback in to our backlog. This iterative approach made it easier for us to react
to changes in requirements and priorities. As the project progressed the user base grew, and whilst our stakeholders were
happy our users were struggling to use our UI. We started running user feedback sessions and slowly improved the UI, however
we struggled to get regular access to users. This was a big learning experience for me - we'd built a complex system that
was well engineered but neglected to give the same importance to the usability of our UI. Since this project I've been
learning lots about UX and have involved users regularly from the beginning of projects.
