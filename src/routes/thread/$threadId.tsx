import { createFileRoute } from '@tanstack/react-router';
import { ChatLayout } from '@/components/chat/ChatLayout';

export const Route = createFileRoute('/thread/$threadId')({
  component: ThreadPage,
});

function ThreadPage() {
  const { threadId } = Route.useParams();
  
  return <ChatLayout threadId={threadId} />;
}