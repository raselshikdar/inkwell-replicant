export const mockArticleContent: Record<string, string> = {
  "back-to-freebsd-part-2-jails": `
## Introduction

FreeBSD jails are one of the most powerful features of the FreeBSD operating system. They provide lightweight virtualization that predates Docker containers by over a decade.

### What are Jails?

Jails extend the chroot concept by virtualizing access to the file system, the set of users, and the networking subsystem. A jailed process cannot affect resources outside of that jail.

### Setting Up Your First Jail

\`\`\`bash
# Create a jail directory
mkdir -p /jails/myjail

# Extract the base system
fetch https://download.freebsd.org/releases/amd64/14.0-RELEASE/base.txz
tar -xf base.txz -C /jails/myjail
\`\`\`

### Networking

Each jail can have its own IP address, or share the host's network stack. The \`vnet\` feature gives jails their own complete network stack.

### Benefits Over Docker

1. **Maturity** — Jails have been around since FreeBSD 4.0 (2000)
2. **Security** — Built on decades of security hardening
3. **Performance** — Near-native performance with minimal overhead
4. **ZFS Integration** — Snapshots, clones, and replication built-in

### Conclusion

FreeBSD jails remain a compelling alternative to Linux containers. Their tight integration with ZFS and the BSD ecosystem makes them an excellent choice for production workloads.
  `,
  "sierra-software-engineer": `
## Reflections on a Career in Software

After 15 years in the industry, here's what I've learned about being a software engineer in the age of AI agents.

### The Changing Landscape

The role of a software engineer is evolving rapidly. AI assistants are becoming integral to our daily workflow, but they haven't replaced the need for deep understanding.

### Key Takeaways

- **Fundamentals matter more than ever** — Understanding data structures, algorithms, and system design helps you evaluate AI-generated code
- **Communication is your superpower** — The ability to translate business requirements into technical solutions remains uniquely human
- **Continuous learning is non-negotiable** — The pace of change is accelerating

### Looking Forward

The engineers who thrive will be those who can effectively collaborate with AI tools while maintaining their critical thinking skills.
  `,
};

export const getArticleContent = (slug: string): string => {
  return mockArticleContent[slug] || `
## Article Content

This is a placeholder for the full article content. In production, this would be fetched from the backend API.

### Key Points

- Point one about the topic
- Point two with more details
- Point three wrapping up

### Conclusion

Thank you for reading! Leave a comment below to join the discussion.
  `;
};
